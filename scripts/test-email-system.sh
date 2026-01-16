#!/bin/bash

# Test Email System Script for Job Chaja
# This script tests the email verification and interview invitation functionality

set -e

echo "🚀 Testing Job Chaja Email System"
echo "=================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
API_GATEWAY_URL="${API_GATEWAY_URL:-http://localhost:8000}"
TEST_EMAIL="${TEST_EMAIL:-test@example.com}"
TEST_PASSWORD="${TEST_PASSWORD:-Test123!@#}"
TEST_FULLNAME="${TEST_FULLNAME:-Test User}"

echo "Configuration:"
echo "  API Gateway: $API_GATEWAY_URL"
echo "  Test Email: $TEST_EMAIL"
echo ""

# Function to print success
success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Function to print error
error() {
    echo -e "${RED}✗ $1${NC}"
}

# Function to print info
info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Test 1: Check if services are running
echo "Test 1: Checking if services are running..."
echo "-------------------------------------------"

check_service() {
    local service=$1
    local port=$2
    
    if nc -z localhost $port 2>/dev/null; then
        success "$service is running on port $port"
        return 0
    else
        error "$service is NOT running on port $port"
        return 1
    fi
}

check_service "PostgreSQL" 5432
check_service "Redis" 6379
check_service "RabbitMQ" 5672
check_service "RabbitMQ Management" 15672

echo ""

# Test 2: Register a new user (triggers email verification)
echo "Test 2: Testing Email Verification (User Registration)"
echo "------------------------------------------------------"

REGISTER_RESPONSE=$(curl -s -X POST "$API_GATEWAY_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$TEST_EMAIL\",
    \"password\": \"$TEST_PASSWORD\",
    \"fullName\": \"$TEST_FULLNAME\",
    \"role\": \"MEMBER\"
  }")

echo "Response: $REGISTER_RESPONSE"

if echo "$REGISTER_RESPONSE" | grep -q "success"; then
    success "User registration successful"
    info "Check your email inbox (Mailtrap) for verification email"
else
    error "User registration failed"
    echo "Response: $REGISTER_RESPONSE"
fi

echo ""

# Test 3: Check RabbitMQ queue
echo "Test 3: Checking RabbitMQ Queue"
echo "--------------------------------"

QUEUE_INFO=$(curl -s -u guest:guest http://localhost:15672/api/queues/%2F/auth-service-queue 2>/dev/null)

if [ $? -eq 0 ]; then
    success "RabbitMQ queue accessible"
    echo "Queue info: $QUEUE_INFO"
else
    error "Cannot access RabbitMQ queue"
fi

echo ""

# Test 4: Check Redis for BullMQ jobs
echo "Test 4: Checking Redis for Email Queue Jobs"
echo "--------------------------------------------"

REDIS_KEYS=$(redis-cli KEYS "bull:email:*" 2>/dev/null)

if [ $? -eq 0 ]; then
    success "Redis is accessible"
    echo "BullMQ keys found:"
    echo "$REDIS_KEYS"
    
    # Count jobs in different states
    WAITING=$(redis-cli LLEN "bull:email:wait" 2>/dev/null || echo "0")
    ACTIVE=$(redis-cli LLEN "bull:email:active" 2>/dev/null || echo "0")
    COMPLETED=$(redis-cli LLEN "bull:email:completed" 2>/dev/null || echo "0")
    FAILED=$(redis-cli LLEN "bull:email:failed" 2>/dev/null || echo "0")
    
    echo "  Waiting: $WAITING"
    echo "  Active: $ACTIVE"
    echo "  Completed: $COMPLETED"
    echo "  Failed: $FAILED"
else
    error "Cannot access Redis"
fi

echo ""

# Test 5: Check database for notification records
echo "Test 5: Checking Database for Notification Records"
echo "---------------------------------------------------"

info "Run this SQL query to check notifications:"
echo "  psql -h localhost -U postgres -d notifications -c \"SELECT id, email, notification_type, status, created_at FROM notifications ORDER BY created_at DESC LIMIT 5;\""

echo ""

# Test 6: Interview invitation (requires existing data)
echo "Test 6: Testing Interview Invitation Email"
echo "-------------------------------------------"

info "To test interview invitation, you need to:"
echo "  1. Create a job post"
echo "  2. Create a member user"
echo "  3. Create a corporate user"
echo "  4. Create an interview with the command:"
echo ""
echo "  curl -X POST $API_GATEWAY_URL/interviews \\"
echo "    -H \"Content-Type: application/json\" \\"
echo "    -H \"Authorization: Bearer YOUR_TOKEN\" \\"
echo "    -d '{"
echo "      \"jobPostId\": \"your-job-post-id\","
echo "      \"memberId\": \"your-member-id\","
echo "      \"corporateId\": \"your-corporate-id\","
echo "      \"interviewDate\": \"2026-02-15T14:00:00Z\","
echo "      \"roomId\": \"interview-room-123\""
echo "    }'"

echo ""

# Summary
echo "=================================="
echo "Test Summary"
echo "=================================="
echo ""
success "Email verification test completed"
info "Check your Mailtrap inbox for the verification email"
info "Check RabbitMQ Management UI: http://localhost:15672 (guest/guest)"
info "Monitor Redis: redis-cli MONITOR"
info "Check logs: tail -f apps/notification-service/logs/combined.log"
echo ""
echo "For detailed setup instructions, see: SETUP_EMAIL_SYSTEM.md"
echo ""
