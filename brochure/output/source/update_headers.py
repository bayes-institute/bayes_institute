import os
import re

DIR = '/home/sagar/Desktop/bayes-institute/bayes_institute/brochure/output/source/pages'

# Update page-02.tex (remove "02 / ")
page_02_file = os.path.join(DIR, 'page-02.tex')
with open(page_02_file, 'r') as f:
    text = f.read()
text = text.replace(r'{\BayesLabel 02 / INSIDE BAYES}', r'{\BayesLabel INSIDE BAYES}')
with open(page_02_file, 'w') as f:
    f.write(text)
print("Updated page-02.tex header")

# Update page-03 to page-32 headers
for i in range(3, 33):
    filename = f'page-{i:02d}.tex'
    filepath = os.path.join(DIR, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            text = f.read()
        
        old_prefix = r'{\BayesLabel %02d / ' % i
        new_prefix = r'{\BayesLabel %02d / ' % (i - 2)
        
        if old_prefix in text:
            text = text.replace(old_prefix, new_prefix)
            with open(filepath, 'w') as f:
                f.write(text)
            print(f"Updated header in {filename}")

