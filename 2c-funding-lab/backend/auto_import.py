"""
Auto-import utility module for dynamic module loading.
This module provides utilities to automatically import and register modules.
"""

import importlib
import os
from typing import List, Any


def auto_import_modules(package_path: str, module_names: List[str]) -> List[Any]:
    """
    Automatically import modules from a given package path.
    
    Args:
        package_path: The base package path (e.g., 'app.routes')
        module_names: List of module names to import
        
    Returns:
        List of imported modules
    """
    imported_modules = []
    
    for module_name in module_names:
        try:
            full_module_path = f"{package_path}.{module_name}"
            module = importlib.import_module(full_module_path)
            imported_modules.append(module)
            print(f"Successfully imported: {full_module_path}")
        except ImportError as e:
            print(f"Failed to import {module_name}: {e}")
    
    return imported_modules


def discover_and_import(directory: str, package_path: str) -> List[Any]:
    """
    Discover Python files in a directory and auto-import them.
    
    Args:
        directory: Directory path to search for Python files
        package_path: Base package path for imports
        
    Returns:
        List of imported modules
    """
    if not os.path.exists(directory):
        print(f"Directory not found: {directory}")
        return []
    
    module_names = []
    for filename in os.listdir(directory):
        if filename.endswith('.py') and not filename.startswith('__'):
            module_name = filename[:-3]  # Remove .py extension
            module_names.append(module_name)
    
    return auto_import_modules(package_path, module_names)
