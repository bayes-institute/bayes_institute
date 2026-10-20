import os
import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to find patterns like {\BayesBodyMedium ... }
    # Since regex is bad at nested braces, we can use a simple state machine.
    
    def process(text):
        out = ""
        i = 0
        while i < len(text):
            if text[i:i+6] == r"{\Bayes":
                # find the matching closing brace
                depth = 1
                j = i + 1
                while j < len(text) and depth > 0:
                    if text[j] == '{': depth += 1
                    elif text[j] == '}': depth -= 1
                    j += 1
                if depth == 0:
                    # we found the matching brace at j-1
                    inner = text[i+1:j-1]
                    # if inner doesn't already end with \par
                    if not inner.rstrip().endswith(r"\par"):
                        out += "{" + inner + r"\par}"
                    else:
                        out += text[i:j]
                    i = j
                else:
                    out += text[i]
                    i += 1
            else:
                out += text[i]
                i += 1
        return out
        
    new_content = process(content)
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {filepath}")

directory = "/home/sagar/Desktop/bayes-institute/bayes_institute/brochure/output/source/pages"
for filename in os.listdir(directory):
    if filename.endswith(".tex"):
        fix_file(os.path.join(directory, filename))
