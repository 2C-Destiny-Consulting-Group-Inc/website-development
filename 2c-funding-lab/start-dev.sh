#!/bin/bash
# Quick start script for 2C Funding Lab development

echo "Starting 2C Funding Lab Development Environment..."
echo ""

# Check if we're in the right directory
if [ ! -f "README.md" ]; then
    echo "Error: Please run this script from the 2c-funding-lab directory"
    exit 1
fi

# Function to check if a port is in use
check_port() {
    lsof -ti:$1 > /dev/null 2>&1
}

# Kill existing processes on our ports
echo "Checking for existing processes..."
if check_port 8000; then
    echo "Killing existing process on port 8000..."
    kill $(lsof -ti:8000) 2>/dev/null || true
    sleep 1
fi

if check_port 3000; then
    echo "Killing existing process on port 3000..."
    kill $(lsof -ti:3000) 2>/dev/null || true
    sleep 1
fi

# Start backend
echo ""
echo "Starting Backend (FastAPI on port 8000)..."
cd backend
python3 -m venv venv 2>/dev/null || true
source venv/bin/activate 2>/dev/null || true
pip install -q -r requirements.txt
python3 main.py > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 3

# Check if backend is running
if curl -s http://localhost:8000/health > /dev/null 2>&1; then
    echo "✓ Backend started successfully (PID: $BACKEND_PID)"
else
    echo "✗ Backend failed to start. Check backend.log for details."
    exit 1
fi

# Start frontend
echo ""
echo "Starting Frontend (Next.js on port 3000)..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
echo "Waiting for frontend to start..."
sleep 5

# Check if frontend is running
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✓ Frontend started successfully (PID: $FRONTEND_PID)"
else
    echo "✗ Frontend failed to start. Check frontend.log for details."
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi

# Success message
echo ""
echo "=========================================="
echo "2C Funding Lab is now running!"
echo "=========================================="
echo "Backend API:  http://localhost:8000"
echo "Frontend UI:  http://localhost:3000"
echo "API Docs:     http://localhost:8000/docs"
echo ""
echo "Backend PID:  $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Logs:"
echo "  Backend:  tail -f backend.log"
echo "  Frontend: tail -f frontend.log"
echo ""
echo "To stop both servers:"
echo "  kill $BACKEND_PID $FRONTEND_PID"
echo "=========================================="
