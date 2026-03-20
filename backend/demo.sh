#!/bin/bash
echo -e "🚀 Starting Ramaniya Backend Demo...\n"
sleep 1
echo "======================================"
echo "1. Testing Basic Health Check"
echo "======================================"
curl -s http://localhost:5005/
echo -e "\n\n"

echo "======================================"
echo "2. Registering a New User"
echo "======================================"
USER_RES=$(curl -s -X POST http://localhost:5005/auth/register -H "Content-Type: application/json" -d '{"name":"Rahul Sharma", "email":"rahul@example.com", "phone":"9876543210"}')
echo $USER_RES | python3 -m json.tool
USER_ID=$(echo $USER_RES | python3 -c "import sys, json; print(json.load(sys.stdin)['user']['id'])")
echo -e "\n"

echo "======================================"
echo "3. User PAN Verification"
echo "======================================"
curl -s -X POST http://localhost:5005/pan-verify -H "Content-Type: application/json" -d '{"pan":"AYZPX1234K"}' | python3 -m json.tool
echo -e "\n"

echo "======================================"
echo "4. Initiating KYC System"
echo "======================================"
KYC_RES=$(curl -s -X POST http://localhost:5005/kyc/start -H "Content-Type: application/json" -d "{\"userId\":\"$USER_ID\"}")
echo $KYC_RES | python3 -m json.tool
KYC_ID=$(echo $KYC_RES | python3 -c "import sys, json; print(json.load(sys.stdin)['kyc']['id'])")
echo -e "\n"

echo "======================================"
echo "5. Webhook: KYC Approved via Partner Provider"
echo "======================================"
curl -s -X POST http://localhost:5005/webhook/kyc -H "Content-Type: application/json" -d "{\"kycId\":\"$KYC_ID\"}" | python3 -m json.tool
echo -e "\n"

echo "======================================"
echo "6. Showing Top Mutual Funds List"
echo "======================================"
curl -s http://localhost:5005/funds | python3 -m json.tool
echo -e "\n"

echo "======================================"
echo "7. Executing an Investment (SIP)"
echo "======================================"
curl -s -X POST http://localhost:5005/invest -H "Content-Type: application/json" -d "{\"userId\":\"$USER_ID\",\"fundName\":\"ICICI Prudential Equity & Debt\",\"amount\":15000}" | python3 -m json.tool
echo -e "\n"

echo "======================================"
echo "8. Fetching User Portfolio"
echo "======================================"
curl -s http://localhost:5005/portfolio/$USER_ID | python3 -m json.tool
echo -e "\n\n"

echo "✅ Full Platform Demo Successfully Executed!"
