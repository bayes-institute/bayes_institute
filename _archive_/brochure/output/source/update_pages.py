import os
import re

DIR = '/home/sagar/Desktop/bayes-institute/bayes_institute/brochure/output/source/pages'

# 1. Update cover.tex
cover_file = os.path.join(DIR, 'cover.tex')
with open(cover_file, 'r') as f:
    cover_text = f.read()

# The specific block to remove from cover.tex:
block_to_remove = r"""  \node[anchor=north east,text=BayesIvory,opacity=0.5,inner sep=0,font=\BayesMeta]
    at ($(current page.north east)+(-14mm,-275mm)$) {01 / 32};"""

cover_text = cover_text.replace(block_to_remove, '')
with open(cover_file, 'w') as f:
    f.write(cover_text)

print("Updated cover.tex")

# 2. Update page-02.tex (TOC and Footer)
page_02_file = os.path.join(DIR, 'page-02.tex')
with open(page_02_file, 'r') as f:
    page_02_text = f.read()

# Replace footer
page_02_text = page_02_text.replace(
    r'\BayesFooter{BayesOxblood}{02}{32}', 
    r'\BayesText{14mm}{282mm}{75mm}{text=BayesOxblood}{{\BayesMeta BAYES INSTITUTE}}'
)

# Replace TOC numbers
def toc_repl(m):
    num = int(m.group(1))
    new_num = num - 2
    return r'{\BayesLabel %02d \hspace{2mm}' % new_num

page_02_text = re.sub(r'\{\\BayesLabel (\d{2}) \\hspace\{2mm\}', toc_repl, page_02_text)

with open(page_02_file, 'w') as f:
    f.write(page_02_text)

print("Updated page-02.tex")

# 3. Update page-03.tex to page-32.tex
def footer_repl(m):
    color = m.group(1)
    num = int(m.group(2))
    new_num = num - 2
    return r'\BayesFooter{%s}{%02d}{30}' % (color, new_num)

for i in range(3, 33):
    filename = f'page-{i:02d}.tex'
    filepath = os.path.join(DIR, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            text = f.read()
        
        # Replace \BayesFooter{Color}{XX}{32}
        text = re.sub(r'\\BayesFooter\{([A-Za-z]+)\}\{(\d{2})\}\{32\}', footer_repl, text)
        
        with open(filepath, 'w') as f:
            f.write(text)
        print(f"Updated {filename}")
