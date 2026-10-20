all:
	latexmk -xelatex -interaction=nonstopmode -halt-on-error main.tex
	mkdir -p ../
	cp -f main.pdf ../bayes-institute-brochure-scaffold.pdf
	rm -f main.aux main.fdb_latexmk main.fls main.log main.out
clean:
	latexmk -C
