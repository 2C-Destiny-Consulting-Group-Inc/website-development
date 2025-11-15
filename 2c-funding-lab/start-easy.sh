#!/bin/bash
# Beginner-Friendly Start Script for 2C Funding Lab

echo "╔════════════════════════════════════════════════════════════╗"
echo "║          2C Funding Lab - Easy Start Script               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if a port is in use
port_in_use() {
    lsof -ti:$1 > /dev/null 2>&1
}

echo "Step 1/6: Checking if required programs are installed..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check Python
if command_exists python3; then
    PYTHON_VERSION=$(python3 --version)
    echo "✓ Python is installed: $PYTHON_VERSION"
    PYTHON_CMD="python3"
elif command_exists python; then
    PYTHON_VERSION=$(python --version)
    echo "✓ Python is installed: $PYTHON_VERSION"
    PYTHON_CMD="python"
else
    echo "✗ ERROR: Python is not installed!"
    echo ""
    echo "Please install Python first:"
    echo "  → Visit: https://www.python.org/downloads/"
    echo "  → Download Python 3.8 or newer"
    echo "  → Run the installer (check 'Add to PATH' on Windows)"
    echo ""
    exit 1
fi

# Check Node.js
if command_exists node; then
    NODE_VERSION=$(node --version)
    echo "✓ Node.js is installed: $NODE_VERSION"
else
    echo "✗ ERROR: Node.js is not installed!"
    echo ""
    echo "Please install Node.js first:"
    echo "  → Visit: https://nodejs.org/"
    echo "  → Download the LTS version"
    echo "  → Run the installer"
    echo ""
    exit 1
fi

# Check npm
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    echo "✓ npm is installed: $NPM_VERSION"
else
    echo "✗ ERROR: npm is not installed!"
    echo ""
    echo "npm should come with Node.js. Please reinstall Node.js."
    exit 1
fi

echo ""
echo "Step 2/6: Checking directory structure..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "✗ ERROR: Cannot find backend or frontend folders!"
    echo ""
    echo "Please make sure you are running this script from the 2c-funding-lab folder:"
    echo "  cd path/to/website-development/2c-funding-lab"
    echo "  ./start-easy.sh"
    echo ""
    exit 1
fi

echo "✓ Found backend and frontend folders"

echo ""
echo "Step 3/6: Setting up backend (this may take a minute)..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

cd backend

# Install Python dependencies
if [ ! -d "venv" ]; then
    echo "→ Creating Python virtual environment..."
    $PYTHON_CMD -m venv venv 2>/dev/null || true
fi

echo "→ Installing Python packages..."
if command_exists pip3; then
    pip3 install -q -r requirements.txt
elif command_exists pip; then
    pip install -q -r requirements.txt
else
    echo "⚠ Warning: Could not find pip. Trying without virtual environment..."
    $PYTHON_CMD -m pip install -q -r requirements.txt
fi

if [ $? -ne 0 ]; then
    echo "✗ ERROR: Failed to install Python packages!"
    echo ""
    echo "Please try manually:"
    echo "  cd backend"
    echo "  pip3 install -r requirements.txt"
    echo ""
    exit 1
fi

echo "✓ Backend dependencies installed"
cd ..

echo ""
echo "Step 4/6: Setting up frontend (this may take several minutes)..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

cd frontend

if [ ! -d "node_modules" ]; then
    echo "→ Installing Node.js packages (first time takes longer)..."
    npm install --silent
    
    if [ $? -ne 0 ]; then
        echo "✗ ERROR: Failed to install Node.js packages!"
        echo ""
        echo "Please try manually:"
        echo "  cd frontend"
        echo "  npm install"
        echo ""
        exit 1
    fi
    echo "✓ Frontend dependencies installed"
else
    echo "✓ Frontend dependencies already installed"
fi

cd ..

echo ""
echo "Step 5/6: Checking if ports are available..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if command_exists lsof; then
    if port_in_use 8000; then
        echo "⚠ Warning: Port 8000 is already in use"
        echo "  Attempting to stop existing process..."
        kill $(lsof -ti:8000) 2>/dev/null || true
        sleep 1
    fi

    if port_in_use 3000; then
        echo "⚠ Warning: Port 3000 is already in use"
        echo "  Attempting to stop existing process..."
        kill $(lsof -ti:3000) 2>/dev/null || true
        sleep 1
    fi
fi

echo "✓ Ports are ready"

echo ""
echo "Step 6/6: Starting the application..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Start backend
echo "→ Starting backend server..."
cd backend
$PYTHON_CMD main.py > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
echo "  Waiting for backend to initialize..."
sleep 3

# Check if backend is running
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "✗ ERROR: Backend failed to start!"
    echo ""
    echo "Check backend.log for error details:"
    echo "  cat backend.log"
    echo ""
    exit 1
fi

# Test backend
if command_exists curl; then
    if curl -s http://localhost:8000/health > /dev/null 2>&1; then
        echo "✓ Backend is running (PID: $BACKEND_PID)"
    else
        echo "⚠ Backend started but may not be responding correctly"
        echo "  Check backend.log for details"
    fi
else
    echo "✓ Backend process started (PID: $BACKEND_PID)"
fi

# Start frontend
echo "→ Starting frontend server..."
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
echo "  Waiting for frontend to initialize..."
sleep 5

# Check if frontend is running
if ! kill -0 $FRONTEND_PID 2>/dev/null; then
    echo "✗ ERROR: Frontend failed to start!"
    echo ""
    echo "Check frontend.log for error details:"
    echo "  cat frontend.log"
    echo ""
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo "✓ Frontend is running (PID: $FRONTEND_PID)"

# Success message
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    🎉 SUCCESS! 🎉                          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "The 2C Funding Lab is now running!"
echo ""
echo "📍 OPEN YOUR WEB BROWSER AND GO TO:"
echo "   → http://localhost:3000"
echo ""
echo "You should see the funding opportunities page with cards."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Additional URLs:"
echo "  • Frontend:  http://localhost:3000"
echo "  • Backend:   http://localhost:8000"
echo "  • API Docs:  http://localhost:8000/docs"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Process Information:"
echo "  • Backend PID:  $BACKEND_PID"
echo "  • Frontend PID: $FRONTEND_PID"
echo ""
echo "Logs:"
echo "  • Backend:  tail -f backend.log"
echo "  • Frontend: tail -f frontend.log"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "To stop the application:"
echo "  kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Or create a stop script:"
echo "  echo 'kill $BACKEND_PID $FRONTEND_PID' > stop.sh"
echo "  chmod +x stop.sh"
echo "  ./stop.sh"
echo ""
echo "Press Ctrl+C to exit this message (servers will keep running)"
echo "════════════════════════════════════════════════════════════"

# Create stop script
echo "#!/bin/bash" > stop.sh
echo "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" >> stop.sh
echo "echo 'Servers stopped.'" >> stop.sh
chmod +x stop.sh

echo ""
echo "✓ Created stop.sh script - run './stop.sh' to stop servers"
