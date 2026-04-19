import ast
import os

def remove_docstrings(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        source = f.read()
    
    try:
        tree = ast.parse(source)
    except SyntaxError:
        return

    # Find line ranges of docstrings
    docstring_lines = []
    
    # helper to check if node is a docstring
    def is_docstring(node):
        return (isinstance(node, ast.Expr) and 
                isinstance(node.value, ast.Constant) and 
                isinstance(node.value.value, str))

    # check module level
    if tree.body and is_docstring(tree.body[0]):
        docstring_lines.append((tree.body[0].lineno, tree.body[0].end_lineno))
        
    for node in ast.walk(tree):
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
            if node.body and is_docstring(node.body[0]):
                docstring_lines.append((node.body[0].lineno, node.body[0].end_lineno))
                
    if not docstring_lines:
        return
        
    # Remove those lines
    lines = source.splitlines()
    lines_to_keep = []
    for i, line in enumerate(lines, 1):
        is_doc = any(start <= i <= end for start, end in docstring_lines)
        if not is_doc:
            lines_to_keep.append(line)
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines_to_keep) + '\n')

backend_dir = '/Users/bhavishyasharma/Plutus.ai/backend'
for f in os.listdir(backend_dir):
    if f.endswith('.py') and f != 'remove_docs.py' and f != 'venv':
        remove_docstrings(os.path.join(backend_dir, f))
