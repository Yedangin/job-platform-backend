import * as bcrypt from 'bcrypt';
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.verificationToken.deleteMany();
  await prisma.loginAttempt.deleteMany();
  await prisma.userOAuth.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.rolePermission.deleteMany();
  await prisma.user.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.role.deleteMany();
  await prisma.oAuthProvider.deleteMany();

  // Create permissions
  const permissionsData = [
    { code: 'user:read', description: 'Read user information' },
    { code: 'user:create', description: 'Create new users' },
    { code: 'user:update', description: 'Update user information' },
    { code: 'user:delete', description: 'Delete users' },
    { code: 'content:create', description: 'Create content' },
    { code: 'content:update', description: 'Update content' },
    { code: 'content:delete', description: 'Delete content' },
    { code: 'admin:access', description: 'Access admin panel' },
  ];

  // Create permissions and store their IDs
  const createdPermissions = await Promise.all(
    permissionsData.map(async (permission) => {
      return await prisma.permission.create({
        data: permission,
      });
    }),
  );

  // Helper function to get permission ID by code
  const getPermissionId = (code: string) => {
    const permission = createdPermissions.find((p) => p.code === code);
    if (!permission) {
      throw new Error(`Permission with code ${code} not found`);
    }
    return permission.id;
  };

  // Create roles
  const [adminRole, userRole] = await prisma.$transaction([
    prisma.role.create({
      data: {
        name: 'admin',
        description: 'Administrator with full access',
        isDefault: false,
      },
    }),
    prisma.role.create({
      data: {
        name: 'user',
        description: 'Regular user',
        isDefault: true,
      },
    }),
  ]);

  // Assign permissions to admin role
  await prisma.rolePermission.createMany({
    data: [
      { roleId: adminRole.id, permissionId: getPermissionId('user:read') },
      { roleId: adminRole.id, permissionId: getPermissionId('user:create') },
      { roleId: adminRole.id, permissionId: getPermissionId('user:update') },
      { roleId: adminRole.id, permissionId: getPermissionId('user:delete') },
      { roleId: adminRole.id, permissionId: getPermissionId('content:create') },
      { roleId: adminRole.id, permissionId: getPermissionId('content:update') },
      { roleId: adminRole.id, permissionId: getPermissionId('content:delete') },
      { roleId: adminRole.id, permissionId: getPermissionId('admin:access') },
    ],
  });

  // Assign permissions to user role
  await prisma.rolePermission.createMany({
    data: [
      { roleId: userRole.id, permissionId: getPermissionId('user:read') },
      { roleId: userRole.id, permissionId: getPermissionId('content:create') },
    ],
  });

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);

  const [adminUser, regularUser] = await prisma.$transaction([
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        passwordHash: hashedPassword,
        isVerified: true,
        isActive: true,
        roles: {
          create: {
            roleId: adminRole.id,
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        email: 'user@example.com',
        passwordHash: hashedPassword,
        isVerified: true,
        isActive: true,
        roles: {
          create: {
            roleId: userRole.id,
          },
        },
      },
    }),
  ]);

  // Create OAuth providers
  await prisma.oAuthProvider.createMany({
    data: [
      {
        name: 'google',
        displayName: 'Google',
        clientId: 'your-google-client-id',
        clientSecret: 'your-google-client-secret',
        authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenUrl: 'https://oauth2.googleapis.com/token',
        userInfoUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
        scopes: 'openid email profile',
        isActive: true,
      },
      {
        name: 'facebook',
        displayName: 'Facebook',
        clientId: 'your-facebook-app-id',
        clientSecret: 'your-facebook-app-secret',
        authorizationUrl: 'https://www.facebook.com/v12.0/dialog/oauth',
        tokenUrl: 'https://graph.facebook.com/v12.0/oauth/access_token',
        userInfoUrl: 'https://graph.facebook.com/v12.0/me?fields=id,name,email',
        scopes: 'email public_profile',
        isActive: true,
      },
    ],
  });

  console.log('Database seeded successfully!');
  console.log('Admin user: admin@example.com / password123');
  console.log('Regular user: user@example.com / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
