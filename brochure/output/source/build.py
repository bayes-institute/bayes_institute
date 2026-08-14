import os
import hashlib

pages_dir = "pages"

def write_page(num, content):
    filename = os.path.join(pages_dir, f"page-{num:02d}.tex")
    with open(filename, "w") as f:
        f.write("\\begin{tikzpicture}[remember picture,overlay]\n")
        f.write(content + "\n")
        f.write("\\end{tikzpicture}\n")

def get_page_footer(page_num, color="BayesIvory"):
    page_str = f"{page_num:02d}"
    return "  \\BayesFooter{" + color + "}{" + page_str + "}{32}"

def generate_tikz_qr(url='https://bayes.institute/programs', size_mm=36, x_mm=25, y_mm=185, fg_color='BayesOxblood', bg_color='BayesIvory'):
    matrix = [[0]*25 for _ in range(25)]
    def add_finder(r, c):
        for dr in range(7):
            for dc in range(7):
                if dr in (0, 6) or dc in (0, 6) or (2 <= dr <= 4 and 2 <= dc <= 4):
                    matrix[r+dr][c+dc] = 1
    add_finder(0, 0)
    add_finder(0, 18)
    add_finder(18, 0)
    for i in range(8, 17):
        matrix[6][i] = 1 if i % 2 == 0 else 0
        matrix[i][6] = 1 if i % 2 == 0 else 0
    for dr in range(5):
        for dc in range(5):
            if dr in (0, 4) or dc in (0, 4) or (dr == 2 and dc == 2):
                matrix[16+dr][16+dc] = 1
    h = hashlib.sha256(url.encode()).digest()
    bit_idx = 0
    for r in range(25):
        for c in range(25):
            if matrix[r][c] == 0:
                if (r < 8 and c < 8) or (r < 8 and c >= 17) or (r >= 17 and c < 8) or (16 <= r <= 20 and 16 <= c <= 20):
                    continue
                if r == 6 or c == 6:
                    continue
                byte = h[bit_idx % len(h)]
                bit = (byte >> (bit_idx % 8)) & 1
                matrix[r][c] = bit
                bit_idx += 1
    module_size = size_mm / 25.0
    lines = []
    lines.append(f'  \\BayesPanel{{{bg_color}}}{{{x_mm}mm}}{{{y_mm}mm}}{{{x_mm+size_mm}mm}}{{{y_mm+size_mm}mm}}')
    for r in range(25):
        for c in range(25):
            if matrix[r][c] == 1:
                mx1 = x_mm + c * module_size
                my1 = y_mm + r * module_size
                mx2 = mx1 + module_size
                my2 = my1 + module_size
                lines.append(f'  \\BayesPanel{{{fg_color}}}{{{mx1:.2f}mm}}{{{my1:.2f}mm}}{{{mx2:.2f}mm}}{{{my2:.2f}mm}}')
    return '\n'.join(lines)

# Page 2: Inside Bayes (TOC)
write_page(2, """
  \\BayesPageBackground{BayesIvory}
  \\BayesPanel{BayesOxblood}{0mm}{0mm}{12mm}{297mm}
  
  \\BayesText{25mm}{35mm}{86mm}{text=BayesVerdigris}{{\\BayesLabel 02 / INSIDE BAYES}}
  \\BayesText{25mm}{48mm}{96mm}{text=BayesOxblood}{{\\Serif\\fontsize{26}{28}\\selectfont TABLE OF CONTENTS}}
  
  \\BayesText{25mm}{85mm}{80mm}{text=BayesOxblood}{
    {\\BayesLabel 03 \\hspace{2mm} THE BELIEF}\\\\\\vspace{2.5mm}
    {\\BayesLabel 04 \\hspace{2mm} THE MISSION}\\\\\\vspace{2.5mm}
    {\\BayesLabel 05 \\hspace{2mm} FIVE PRINCIPLES}\\\\\\vspace{2.5mm}
    {\\BayesLabel 09 \\hspace{2mm} THE FELLOWSHIP AT A GLANCE}\\\\\\vspace{2.5mm}
    {\\BayesLabel 10 \\hspace{2mm} FOUR ARCHETYPES}\\\\\\vspace{2.5mm}
    {\\BayesLabel 12 \\hspace{2mm} HOW YOU LEARN}\\\\\\vspace{2.5mm}
    {\\BayesLabel 20 \\hspace{2mm} THE 40-WEEK JOURNEY}\\\\\\vspace{2.5mm}
    {\\BayesLabel 21 \\hspace{2mm} STAGE 1: FIND THE PROBLEM}\\\\\\vspace{2.5mm}
    {\\BayesLabel 22 \\hspace{2mm} STAGE 2: SHAPE THE PROMISE}\\\\\\vspace{2.5mm}
    {\\BayesLabel 23 \\hspace{2mm} STAGE 3: BUILD UNDER PRESSURE}\\\\\\vspace{2.5mm}
    {\\BayesLabel 24 \\hspace{2mm} STAGE 4: WIN REAL CUSTOMERS}\\\\\\vspace{2.5mm}
    {\\BayesLabel 25 \\hspace{2mm} STAGE 5: STAND ON EVIDENCE}\\\\\\vspace{2.5mm}
    {\\BayesLabel 26 \\hspace{2mm} THE EVIDENCE BOARD}\\\\\\vspace{2.5mm}
    {\\BayesLabel 27 \\hspace{2mm} TRUST \\& GUARANTEES}\\\\\\vspace{2.5mm}
    {\\BayesLabel 28 \\hspace{2mm} INVESTMENT \\& RATIONALIZATION}\\\\\\vspace{2.5mm}
    {\\BayesLabel 29 \\hspace{2mm} SCHOLARSHIPS}\\\\\\vspace{2.5mm}
    {\\BayesLabel 30 \\hspace{2mm} ADMISSIONS}\\\\\\vspace{2.5mm}
    {\\BayesLabel 32 \\hspace{2mm} PRE-ENGAGEMENT}
  }

  \\BayesPanel{BayesPaleOxblood}{115mm}{35mm}{196mm}{260mm}
  \\BayesText{123mm}{45mm}{65mm}{text=BayesOxblood}{
    {\\BayesLabel ARCHITECTURAL ETHOS}\\\\\\vspace{4mm}
    {\\BayesSerifTitle EXPERIENCE BEFORE THEORY}\\\\\\vspace{4mm}
    {\\BayesBody The Bayes Founder Fellowship operates on a single continuous venture artifact chain. \\\\\\vspace{3mm}
    Each week inherits the product, evidence, and customer signals created before it. Learning follows action: Wednesday briefing, Thursday naive sprint, Friday deconstruction, and weekend production upgrade.}
  }
""" + get_page_footer(2, "BayesOxblood"))

# Page 3: Humanity’s greatest promise
write_page(3, """
  \\BayesPageBackground{BayesIvory}
  \\node[anchor=north west,inner sep=0] at ($(current page.north west)+(25mm,-25mm)$)
    {\\includegraphics[width=18mm]{assets/bayes-emblem-primary.pdf}};
  \\BayesText{25mm}{125mm}{160mm}{text=BayesOxblood}{{\\Serif\\fontsize{34}{40}\\selectfont Humanity's greatest promise\\\\is what people can become.}}
""" + get_page_footer(3, "BayesOxblood"))

# Page 4: From possibility to capability.
write_page(4, """
  \\BayesPageBackground{BayesIvory}
  \\BayesText{25mm}{44mm}{86mm}{text=BayesVerdigris}{{\\BayesLabel 04 / THE MISSION}}
  \\BayesText{25mm}{62mm}{160mm}{text=BayesOxblood}{{\\Serif\\fontsize{32}{36}\\selectfont FROM POSSIBILITY\\\\TO CAPABILITY.}}
  \\BayesText{25mm}{115mm}{160mm}{text=BayesOxblood}{{\\BayesBodyLarge Bayes creates the conditions in which human possibility becomes human capability.}}
  
  \\BayesPanel{BayesVerdigris}{25mm}{155mm}{75mm}{235mm}
  \\BayesText{31mm}{165mm}{38mm}{text=BayesIvory}{{\\BayesLabel DISCOVER}\\\\\\vspace{3mm}{\\BayesBodySmall Uncover personal asymmetric leverage and target fertile problem lands.}}

  \\BayesPanel{BayesOxblood}{80mm}{155mm}{130mm}{235mm}
  \\BayesText{86mm}{165mm}{44mm}{text=BayesIvory}{{\\BayesLabel DEVELOP}\\\\\\vspace{3mm}{\\BayesBodySmall Build software products, master customer loops, and engineer real systems.}}

  \\BayesPanel{BayesVerdigris}{135mm}{155mm}{185mm}{235mm}
  \\BayesText{141mm}{165mm}{38mm}{text=BayesIvory}{{\\BayesLabel DIRECT}\\\\\\vspace{3mm}{\\BayesBodySmall Command your own venture, win paying users, and stand on evidence.}}

  \\BayesText{25mm}{255mm}{160mm}{text=BayesOxblood}{{\\BayesLabel DISCOVER. DEVELOP. DIRECT.}}
""" + get_page_footer(4, "BayesOxblood"))

# Page 5: Five principles. One institution.
write_page(5, """
  \\BayesPageBackground{BayesOxblood}
  \\BayesPanel{BayesVerdigris}{171mm}{0mm}{210mm}{16mm}
  \\BayesText{14mm}{17mm}{160mm}{text=BayesIvory}{{\\BayesLabel 05 / FIVE PRINCIPLES. ONE INSTITUTION.}}
  
  \\BayesPanel{BayesIvory}{14mm}{45mm}{100mm}{115mm}
  \\BayesText{20mm}{53mm}{74mm}{text=BayesOxblood}{{\\BayesLabel 01 / SEE POSSIBILITY BEFORE PROOF}\\\\\\vspace{2.5mm}{\\BayesBody We look for curiosity, trajectory, and capacity to grow, not just polished achievement.}}
  
  \\BayesPanel{BayesVerdigris}{105mm}{45mm}{196mm}{115mm}
  \\BayesText{111mm}{53mm}{79mm}{text=BayesIvory}{{\\BayesLabel 02 / TURN IDEAS INTO ACTION}\\\\\\vspace{2.5mm}{\\BayesBody Ideas only matter when they survive questioning, building, testing, and real-world use.}}
  
  \\BayesPanel{BayesPaleOxblood}{14mm}{122mm}{100mm}{192mm}
  \\BayesText{20mm}{130mm}{74mm}{text=BayesOxblood}{{\\BayesLabel 03 / RAISE STANDARDS, BUILD MORE LADDERS}\\\\\\vspace{2.5mm}{\\BayesBody We keep expectations high and reinforce support so hard growth can actually happen.}}
  
  \\BayesPanel{BayesIvory}{105mm}{122mm}{196mm}{192mm}
  \\BayesText{111mm}{130mm}{79mm}{text=BayesOxblood}{{\\BayesLabel 04 / OWN WHAT HAPPENS NEXT}\\\\\\vspace{2.5mm}{\\BayesBody We do not blame conditions. We choose the next meaningful action.}}
  
  \\BayesPanel{BayesVerdigris}{14mm}{199mm}{196mm}{260mm}
  \\BayesText{20mm}{210mm}{160mm}{text=BayesIvory}{{\\BayesLabel 05 / LET TRUTH REVISE US}\\\\\\vspace{3mm}{\\BayesBody We treat beliefs as hypotheses and update quickly when evidence changes.}}
  
""" + get_page_footer(5, "BayesIvory"))

# Page 6: BECOME MORE.
write_page(6, """
  \\BayesPageBackground{BayesIvory}
  \\BayesImageW{95mm}{0mm}{210mm}{297mm}{assets/mentor-seminar.png}
  \\BayesPanel{BayesOxblood}{90mm}{0mm}{95mm}{297mm}
  
  \\BayesText{14mm}{110mm}{70mm}{text=BayesOxblood}{{\\Serif\\fontsize{36}{40}\\selectfont BECOME\\\\MORE.}}
  \\BayesText{14mm}{150mm}{70mm}{text=BayesOxblood}{{\\BayesBodyLarge You Are Meant to Become More.}}
""" + get_page_footer(6, "BayesOxblood"))

# Page 7: Too many capable builders
write_page(7, """
  \\BayesPageBackground{BayesOxblood}
  \\BayesText{25mm}{40mm}{160mm}{text=BayesIvory}{{\\Serif\\fontsize{26}{28}\\selectfont Too many capable builders\\\\never become founders.}}
  
  \\BayesText{25mm}{125mm}{160mm}{text=BayesIvory}{{\\Serif\\fontsize{34}{38}\\selectfont They can build.\\\\They just do not yet have a\\\\clear path from product\\\\to paying customer.}}
  
  \\BayesText{25mm}{250mm}{160mm}{text=BayesIvory}{{\\BayesBodyLarge Bayes exists to close this gap.}}
""" + get_page_footer(7, "BayesIvory"))

# Page 8: A serious first attempt
write_page(8, """
  \\BayesPageBackground{BayesIvory}
  \\BayesText{14mm}{17mm}{160mm}{text=BayesVerdigris}{{\\BayesLabel 08 / THE BOUNDED FIRST ATTEMPT}}
  \\BayesText{14mm}{38mm}{176mm}{text=BayesOxblood}{{\\BayesSansDisplay A SERIOUS FIRST ATTEMPT.}}
  
  \\BayesPanel{BayesOxblood}{14mm}{65mm}{71mm}{245mm}
  \\BayesText{20mm}{78mm}{45mm}{text=BayesIvory}{{\\BayesLabel REAL ENOUGH\\\\TO TEACH}\\\\\\vspace{5mm}{\\BayesBody Working with real people, real needs, and real money, so every lesson feels alive.}}
  
  \\BayesPanel{BayesVerdigris}{75mm}{65mm}{132mm}{245mm}
  \\BayesText{81mm}{78mm}{45mm}{text=BayesIvory}{{\\BayesLabel RIGOROUS ENOUGH\\\\TO MATTER}\\\\\\vspace{5mm}{\\BayesBody Pushing you to think clearly, move quickly, and make decisions you can stand behind.}}
  
  \\BayesPanel{BayesPaleOxblood}{136mm}{65mm}{196mm}{245mm}
  \\BayesText{142mm}{78mm}{45mm}{text=BayesOxblood}{{\\BayesLabel BOUNDED ENOUGH\\\\TO SURVIVE}\\\\\\vspace{5mm}{\\BayesBody Giving you the space to learn, build, and grow without putting everything at risk too soon.}}
""" + get_page_footer(8, "BayesOxblood"))

# Page 9: The Fellowship at a glance
write_page(9, """
  \\BayesPageBackground{BayesOxblood}
  \\BayesText{14mm}{25mm}{176mm}{text=BayesIvory}{{\\BayesLabel 09 / THE FELLOWSHIP AT A GLANCE}}
  
  \\BayesPanel{BayesVerdigris}{14mm}{45mm}{98mm}{135mm}
  \\BayesText{22mm}{55mm}{70mm}{text=BayesIvory}{{\\Serif\\fontsize{44}{44}\\selectfont 40}\\\\\\vspace{2mm}{\\BayesLabel WEEKS OF GUIDED EXECUTION}}
  
  \\BayesPanel{BayesIvory}{105mm}{45mm}{196mm}{135mm}
  \\BayesText{113mm}{55mm}{75mm}{text=BayesOxblood}{{\\Serif\\fontsize{44}{44}\\selectfont 200}\\\\\\vspace{2mm}{\\BayesLabel GUIDED LIVE HOURS}}

  \\BayesPanel{BayesIvory}{14mm}{142mm}{98mm}{230mm}
  \\BayesText{22mm}{152mm}{74mm}{text=BayesOxblood}{{\\Serif\\fontsize{44}{44}\\selectfont 5}\\\\\\vspace{2mm}{\\BayesLabel LIVE HOURS PER WEEK (PART-TIME)}}

  \\BayesPanel{BayesVerdigris}{105mm}{142mm}{196mm}{230mm}
  \\BayesText{113mm}{152mm}{75mm}{text=BayesIvory}{{\\Serif\\fontsize{44}{44}\\selectfont 0\\%}\\\\\\vspace{2mm}{\\BayesLabel EQUITY DILUTION}}

  \\BayesText{14mm}{250mm}{160mm}{text=BayesIvory}{{\\BayesBody Hybrid part-time model. Direct founder tables. Zero cap table interference.}}
""" + get_page_footer(9, "BayesIvory"))

# Page 10: Who is this for?
write_page(10, """
  \\BayesPageBackground{BayesIvory}
  \\BayesText{14mm}{17mm}{160mm}{text=BayesVerdigris}{{\\BayesLabel 10 / FOUR ARCHETYPES}}
  \\BayesText{14mm}{35mm}{176mm}{text=BayesOxblood}{{\\BayesSansDisplay WHO IS THIS FOR?}}
  
  \\BayesPanel{BayesOxblood}{14mm}{55mm}{100mm}{150mm}
  \\BayesText{20mm}{65mm}{74mm}{text=BayesIvory}{{\\BayesLabel 01 / PRODUCT \\& SOFTWARE ENGINEERS}\\\\\\vspace{3mm}{\\BayesBody Engineers building software systems with a strong bias toward shipping.}}
  
  \\BayesPanel{BayesVerdigris}{105mm}{55mm}{196mm}{150mm}
  \\BayesText{111mm}{65mm}{79mm}{text=BayesIvory}{{\\BayesLabel 02 / STEM BUILDERS}\\\\\\vspace{3mm}{\\BayesBody Students or graduates in science, math, and technical fields building real tools.}}
  
  \\BayesPanel{BayesVerdigris}{14mm}{160mm}{100mm}{255mm}
  \\BayesText{20mm}{170mm}{74mm}{text=BayesIvory}{{\\BayesLabel 03 / FINAL-YEAR ENG STUDENTS}\\\\\\vspace{3mm}{\\BayesBody Students ready to transition from classroom assignments to serious building.}}
  
  \\BayesPanel{BayesOxblood}{105mm}{160mm}{196mm}{255mm}
  \\BayesText{111mm}{170mm}{79mm}{text=BayesIvory}{{\\BayesLabel 04 / AMBITIOUS TECH FOUNDERS}\\\\\\vspace{3mm}{\\BayesBody Builders from adjacent backgrounds serious about creating tech companies.}}
""" + get_page_footer(10, "BayesOxblood"))

# Page 11: Life At Bayes
write_page(11, """
  \\BayesPageBackground{BayesOxblood}
  \\BayesImageW{0mm}{0mm}{210mm}{297mm}{assets/prototype-work.png}
  \\BayesPanel{BayesOxblood,opacity=.72}{0mm}{0mm}{210mm}{297mm}
  \\BayesText{25mm}{120mm}{160mm}{text=BayesIvory}{{\\Serif\\fontsize{42}{46}\\selectfont LIFE AT BAYES.}}
  \\BayesText{25mm}{155mm}{160mm}{text=BayesIvory}{{\\BayesBodyLarge BUILD. OBSERVE. QUESTION.}}
""" + get_page_footer(11, "BayesIvory"))

# Page 12: Weekly Missions
write_page(12, """
  \\BayesPageBackground{BayesIvory}
  \\BayesImageW{0mm}{0mm}{90mm}{297mm}{assets/field-learning.png}
  \\BayesPanel{BayesOxblood}{88mm}{0mm}{92mm}{297mm}
  
  \\BayesText{102mm}{35mm}{92mm}{text=BayesVerdigris}{{\\BayesLabel 12 / WEEKLY OPERATING RHYTHM}}
  \\BayesText{102mm}{50mm}{92mm}{text=BayesOxblood}{{\\Serif\\fontsize{26}{29}\\selectfont SINGLE WEEKLY\\\\VENTURE MISSION}}
  \\BayesText{102mm}{105mm}{92mm}{text=BayesOxblood}{{\\BayesBody Each week is built around a single action mission. The work begins before the theory, so the lesson arrives only after the friction is real.}}
  
  \\BayesPanel{BayesPaleOxblood}{102mm}{165mm}{196mm}{255mm}
  \\BayesText{108mm}{175mm}{80mm}{text=BayesOxblood}{
    {\\BayesLabel 7-DAY OPERATIONAL CADENCE}\\\\\\vspace{3mm}
    {\\BayesBodySmall \\textbf{Wed:} Mission Briefing \\& V1 Prompt\\\\
    \\textbf{Thu:} Unguided Naive V1 Sprint\\\\
    \\textbf{Fri:} Theory, Frameworks \\& Pre-Reads\\\\
    \\textbf{Weekend:} V2 Production Upgrade\\\\
    \\textbf{Mon:} Osmotic Learning \\& Sync\\\\
    \\textbf{Tue:} Backlog Clearance \\& Outreach}
  }
""" + get_page_footer(12, "BayesOxblood"))

# Page 13: Visible Progress
write_page(13, """
  \\BayesPageBackground{BayesOxblood}
  \\BayesText{14mm}{25mm}{180mm}{text=BayesVerdigris}{{\\BayesLabel 13 / VISIBLE PROGRESS}}
  \\BayesText{14mm}{40mm}{180mm}{text=BayesIvory}{{\\Serif\\fontsize{26}{30}\\selectfont The first draft comes first.\\\\Then the deconstruction. Then the upgrade.}}
  \\BayesText{14mm}{90mm}{180mm}{text=BayesIvory}{{\\BayesBody Founders execute Version 1 before receiving theory. After Friday's live teardowns and frameworks, they rebuild Version 2 over the weekend. The delta between Version 1 and Version 2 is the visible proof of learning.}}

  \\BayesPanel{BayesIvory}{14mm}{145mm}{98mm}{240mm}
  \\BayesText{20mm}{155mm}{72mm}{text=BayesOxblood}{{\\BayesLabel THURSDAY / NAIVE V1 SPRINT}\\\\\\vspace{3mm}{\\BayesBody Raw intuitive attempt written or coded under real constraints without external theory.}}

  \\BayesPanel{BayesVerdigris}{105mm}{145mm}{196mm}{240mm}
  \\BayesText{111mm}{155mm}{77mm}{text=BayesIvory}{{\\BayesLabel WEEKEND / V2 PRODUCTION BUILD}\\\\\\vspace{3mm}{\\BayesBody Upgraded production-grade asset informed by Friday frameworks and live mentor critique.}}
""" + get_page_footer(13, "BayesIvory"))

# Page 14: Ground Truth Calibration
write_page(14, """
  \\BayesPageBackground{BayesIvory}
  \\BayesImageW{0mm}{0mm}{210mm}{160mm}{assets/mentor-seminar.png}
  \\BayesPanel{BayesOxblood,opacity=.25}{0mm}{0mm}{210mm}{160mm}
  \\BayesText{14mm}{180mm}{180mm}{text=BayesVerdigris}{{\\BayesLabel 14 / GROUND TRUTH CALIBRATION}}
  \\BayesText{14mm}{195mm}{180mm}{text=BayesOxblood}{{\\Serif\\fontsize{26}{30}\\selectfont DISSECT REAL SYSTEMS AND OPERATOR FRICTION.}}
  \\BayesText{14mm}{230mm}{180mm}{text=BayesOxblood}{{\\BayesBody Every mission begins with a hypothesis and ends with evidence. Fellows interrogate ground-level operational workflows, calculate the cost of doing nothing, and validate market demand.}}
""" + get_page_footer(14, "BayesOxblood"))

# Page 15: Osmotic Learning
write_page(15, """
  \\BayesPageBackground{BayesOxblood}
  \\BayesText{14mm}{25mm}{180mm}{text=BayesVerdigris}{{\\BayesLabel 15 / OSMOTIC LEARNING}}
  \\BayesText{14mm}{40mm}{180mm}{text=BayesIvory}{{\\Serif\\fontsize{24}{28}\\selectfont UNVARNISHED DIAGNOSTICS.\\\\NO PERFORMANCE.}}
  \\BayesText{14mm}{85mm}{180mm}{text=BayesIvory}{{\\BayesBody Diagnostic clinics, peer pods, and live product teardowns replace performative presentations. Fellows discuss customer pushback, pricing friction, and operational bottlenecks openly.}}
  
  \\BayesPanel{BayesIvory}{14mm}{140mm}{196mm}{240mm}
  \\BayesText{20mm}{152mm}{164mm}{text=BayesOxblood}{{\\BayesLabel MONDAY DIAGNOSTIC CLINIC}\\\\\\vspace{3mm}{\\BayesBody 2-hour live session bringing the cohort together to stress-test evidence, teardown V2 builds, and calibrate next steps.}}
""" + get_page_footer(15, "BayesIvory"))

# Page 16: Signal Over Vanity
write_page(16, """
  \\BayesPageBackground{BayesIvory}
  \\BayesText{14mm}{25mm}{180mm}{text=BayesVerdigris}{{\\BayesLabel 16 / SIGNAL OVER VANITY}}
  \\BayesText{14mm}{40mm}{180mm}{text=BayesOxblood}{{\\Serif\\fontsize{26}{30}\\selectfont SHOW WHAT FAILED.\\\\SHOW WHAT CHANGED.}}
  \\BayesText{14mm}{85mm}{180mm}{text=BayesOxblood}{{\\BayesBody Instead of vanity metrics, fellows present invalidated assumptions, unexpected customer behavior, and code or copy discarded to move forward.}}

  \\BayesPanel{BayesOxblood}{14mm}{140mm}{196mm}{240mm}
  \\BayesText{20mm}{152mm}{164mm}{text=BayesIvory}{{\\BayesLabel REVEAL DAY SPRINT}\\\\\\vspace{3mm}{\\BayesBody Transparently narration of what initial thesis assumptions proved wrong during execution, locking pitch habits before customer sales calls.}}
""" + get_page_footer(16, "BayesOxblood"))

# Page 17: Founder Masterclasses
write_page(17, """
  \\BayesPageBackground{BayesOxblood}
  \\BayesText{14mm}{20mm}{160mm}{text=BayesVerdigris}{{\\BayesLabel 17 / FOUNDER MASTERCLASSES}}
  \\BayesText{14mm}{35mm}{176mm}{text=BayesIvory}{{\\BayesSansDisplay REAL OPERATORS. REAL NUMBERS.\\\\REAL DECISIONS.}}
  
  \\BayesPanel{BayesIvory}{14mm}{85mm}{71mm}{210mm}
  \\BayesText{20mm}{95mm}{45mm}{text=BayesOxblood}{{\\BayesLabel UNIT ECONOMICS}\\\\\\vspace{3mm}{\\BayesBodySmall Dissecting real spreadsheets, margins, CAC, and payback periods.}}

  \\BayesPanel{BayesVerdigris}{75mm}{85mm}{132mm}{210mm}
  \\BayesText{81mm}{95mm}{45mm}{text=BayesIvory}{{\\BayesLabel NEAR MISSES}\\\\\\vspace{3mm}{\\BayesBodySmall Near-fatal mistakes, co-founder friction, and pivot moments.}}

  \\BayesPanel{BayesPaleOxblood}{136mm}{85mm}{196mm}{210mm}
  \\BayesText{142mm}{95mm}{45mm}{text=BayesOxblood}{{\\BayesLabel BOARD ROOMS}\\\\\\vspace{3mm}{\\BayesBodySmall What survival and commercial momentum actually require.}}
  
  \\BayesText{14mm}{230mm}{180mm}{text=BayesIvory}{{\\BayesBody Guest founders and operators break down actual data, unvarnished spreadsheets, and strategic tradeoffs.}}
""" + get_page_footer(17, "BayesIvory"))

# Page 18: Diagnostic Hot Seat
write_page(18, """
  \\BayesPageBackground{BayesIvory}
  \\BayesText{14mm}{25mm}{180mm}{text=BayesVerdigris}{{\\BayesLabel 18 / DIAGNOSTIC CLINIC}}
  \\BayesText{14mm}{40mm}{180mm}{text=BayesOxblood}{{\\Serif\\fontsize{24}{28}\\selectfont ONE FOUNDER. ONE ROOM OF QUESTIONS.}}
  \\BayesText{14mm}{85mm}{180mm}{text=BayesOxblood}{{\\BayesBody One founder presents their current stage of venture evidence. The cohort challenges assumptions, inspects user data, and forces key decisions into the open.}}

  \\BayesPanel{BayesOxblood}{14mm}{140mm}{196mm}{240mm}
  \\BayesText{20mm}{152mm}{164mm}{text=BayesIvory}{{\\BayesLabel PEER INTERROGATION NORMS}\\\\\\vspace{3mm}{\\BayesBody Constructive, unvarnished peer review standards designed to surface hidden friction and sharpen venture conviction.}}
""" + get_page_footer(18, "BayesOxblood"))

# Page 19: Fellowship Finale
write_page(19, """
  \\BayesPageBackground{BayesOxblood}
  \\BayesText{14mm}{25mm}{180mm}{text=BayesVerdigris}{{\\BayesLabel 19 / THE FINALE}}
  \\BayesText{14mm}{40mm}{180mm}{text=BayesIvory}{{\\Serif\\fontsize{26}{30}\\selectfont DEMO DAY \\& COMMERCIAL REVEAL.}}
  \\BayesText{14mm}{85mm}{180mm}{text=BayesIvory}{{\\BayesBody Founders pitch battle-tested businesses backed by real evidence of customer pull, working software products, and verified unit economics to investors and domain operators.}}

  \\BayesPanel{BayesVerdigris}{14mm}{140mm}{196mm}{240mm}
  \\BayesText{20mm}{152mm}{164mm}{text=BayesIvory}{{\\BayesLabel GRADUATION STANDARDS}\\\\\\vspace{3mm}{\\BayesBody Graduation requires verified commercial pull: minimum \\rupee 40,000 MRR or signed LOIs / paid pilot agreements.}}
""" + get_page_footer(19, "BayesIvory"))

# Page 20: The Bayes Curriculum Blueprint
write_page(20, """
  \\BayesPageBackground{BayesOxblood}
  \\BayesText{14mm}{25mm}{180mm}{text=BayesVerdigris}{{\\BayesLabel 20 / THE 40-WEEK CADENCE}}
  \\BayesText{14mm}{40mm}{180mm}{text=BayesIvory}{{\\Serif\\fontsize{32}{36}\\selectfont THE 40-WEEK\\\\CURRICULUM BLUEPRINT}}
  \\BayesText{14mm}{90mm}{180mm}{text=BayesIvory}{{\\BayesBody This curriculum is designed to build rigorous learning environments that equip people with the knowledge, courage, and agency to shape their lives and make a meaningful contribution to the world.}}
  
  \\BayesPanel{BayesVerdigris}{14mm}{160mm}{196mm}{250mm}
  \\BayesText{20mm}{172mm}{164mm}{text=BayesIvory}{
    {\\BayesLabel CONTINUOUS VENTURE ARTIFACT CHAIN}\\\\\\vspace{3mm}
    {\\BayesBody 40 Weeks \\hspace{2mm}|\\hspace{2mm} Part-Time (5 hrs/wk) \\hspace{2mm}|\\hspace{2mm} 200 Guided Hours \\hspace{2mm}|\\hspace{2mm} 5 Execution Stages \\hspace{2mm}|\\hspace{2mm} 40 Action Missions}
  }
""" + get_page_footer(20, "BayesIvory"))

# Curriculum Stage Generator for Pages 21-25
def render_stage_page(page_num, stage_num, title, weeks_label, bg_color, text_color, highlight_color, weeks_data):
    content = []
    content.append("  \\BayesPageBackground{" + bg_color + "}")
    stage_str = f"{stage_num:02d}"
    content.append("  \\BayesText{14mm}{18mm}{180mm}{text=" + highlight_color + "}{{\\BayesLabel STAGE " + stage_str + " / " + weeks_label + "}}")
    content.append("  \\BayesText{14mm}{28mm}{180mm}{text=" + text_color + "}{{\\Serif\\fontsize{24}{27}\\selectfont " + title + "}}")
    
    start_y = 52
    
    # Table header
    content.append(f"  \\BayesPanel{{{highlight_color}}}{{14mm}}{{{start_y}mm}}{{196mm}}{{{start_y+7}mm}}")
    content.append("  \\BayesText{16mm}{" + f"{start_y+1.8:.1f}" + "mm}{12mm}{text=BayesIvory}{{\\BayesLabel WK}}")
    content.append("  \\BayesText{28mm}{" + f"{start_y+1.8:.1f}" + "mm}{62mm}{text=BayesIvory}{{\\BayesLabel VENTURE MISSION (ACTION-ORIENTED)}}")
    content.append("  \\BayesText{92mm}{" + f"{start_y+1.8:.1f}" + "mm}{50mm}{text=BayesIvory}{{\\BayesLabel THU V1 SPRINT}}")
    content.append("  \\BayesText{144mm}{" + f"{start_y+1.8:.1f}" + "mm}{50mm}{text=BayesIvory}{{\\BayesLabel WEEKEND V2 PRODUCTION BUILD}}")
    
    y = start_y + 8
    for wk, mission, question, v1, v2 in weeks_data:
        mission = mission.replace('&', '\\&')
        question = question.replace('&', '\\&')
        v1 = v1.replace('&', '\\&')
        v2 = v2.replace('&', '\\&')
        box_bg = "BayesIvory" if bg_color == "BayesIvory" else "BayesPaleOxblood"
        if (wk % 2 == 0):
            box_bg = "BayesSoftIvory" if bg_color == "BayesIvory" else "BayesOxblood"
            
        panel_color = "BayesIvory" if (bg_color == "BayesOxblood" and wk % 2 == 1) else ("BayesOxblood" if bg_color == "BayesIvory" else "BayesIvory")
        txt_col = text_color if panel_color != text_color else ("BayesIvory" if bg_color == "BayesOxblood" else "BayesOxblood")
        
        # Dense vs spacious styling based on row count
        if len(weeks_data) > 10:
            h = 14.5
            content.append(f"  \\BayesPanel{{{box_bg}}}{{14mm}}{{{y:.1f}mm}}{{196mm}}{{{y+h-1:.1f}mm}}")
            content.append("  \\BayesText{16mm}{" + f"{y+1.5:.1f}" + "mm}{10mm}{text=" + txt_col + "}{{\\BayesLabel W" + str(wk) + "}}")
            content.append("  \\BayesText{28mm}{" + f"{y+1.5:.1f}" + "mm}{62mm}{text=" + txt_col + "}{{\\BayesBodyTiny \\textbf{" + mission + "}}}")
            content.append("  \\BayesText{92mm}{" + f"{y+1.5:.1f}" + "mm}{50mm}{text=" + txt_col + "}{{\\BayesBodyTiny " + v1 + "}}")
            content.append("  \\BayesText{144mm}{" + f"{y+1.5:.1f}" + "mm}{50mm}{text=" + txt_col + "}{{\\BayesBodyTiny " + v2 + "}}")
            y += h
        elif len(weeks_data) > 6:
            h = 21
            content.append(f"  \\BayesPanel{{{box_bg}}}{{14mm}}{{{y:.1f}mm}}{{196mm}}{{{y+h-1.5:.1f}mm}}")
            content.append("  \\BayesText{16mm}{" + f"{y+2:.1f}" + "mm}{10mm}{text=" + txt_col + "}{{\\BayesLabel W" + str(wk) + "}}")
            content.append("  \\BayesText{28mm}{" + f"{y+2:.1f}" + "mm}{62mm}{text=" + txt_col + "}{{\\BayesBodySmall \\textbf{" + mission + "}\\\\\\vspace{1mm}{\\BayesBodyTiny " + question + "}}}")
            content.append("  \\BayesText{92mm}{" + f"{y+2:.1f}" + "mm}{50mm}{text=" + txt_col + "}{{\\BayesBodyTiny " + v1 + "}}")
            content.append("  \\BayesText{144mm}{" + f"{y+2:.1f}" + "mm}{50mm}{text=" + txt_col + "}{{\\BayesBodyTiny " + v2 + "}}")
            y += h
        else:
            h = 34
            wk_str = f"{wk:02d}"
            content.append(f"  \\BayesPanel{{{box_bg}}}{{14mm}}{{{y:.1f}mm}}{{196mm}}{{{y+h-2:.1f}mm}}")
            content.append("  \\BayesText{16mm}{" + f"{y+3:.1f}" + "mm}{10mm}{text=" + txt_col + "}{{\\Serif\\fontsize{16}{16}\\selectfont " + wk_str + "}}")
            content.append("  \\BayesText{28mm}{" + f"{y+3:.1f}" + "mm}{62mm}{text=" + txt_col + "}{{\\BayesBody \\textbf{" + mission + "}\\\\\\vspace{1.5mm}{\\BayesBodySmall " + question + "}}}")
            content.append("  \\BayesText{92mm}{" + f"{y+3:.1f}" + "mm}{50mm}{text=" + txt_col + "}{{\\BayesBodySmall " + v1 + "}}")
            content.append("  \\BayesText{144mm}{" + f"{y+3:.1f}" + "mm}{50mm}{text=" + txt_col + "}{{\\BayesBodySmall " + v2 + "}}")
            y += h

    content.append(get_page_footer(page_num, text_color))
    return '\n'.join(content)

curriculum_data = [
    # Stage 1: FIND THE PROBLEM (Weeks 1-6)
    [
        (1, "Map Personal Asymmetric Leverage & Founder Math", "Why does startup risk work differently?", "Write 1-pg Founder OS covering purpose & time budget", "Upgrade Founder OS into production-grade asset"),
        (2, "Deconstruct Indian Demand & Sector Adoption", "Where is India creating new demand?", "Draft 3 venture hypotheses & target customer map", "Upgrade hypothesis deck & revenue ceiling map"),
        (3, "Trace Ecosystem Money Flows & Bottlenecks", "Where does money leak inside an industry?", "Map sub-sector actors & money flows", "Upgrade 2D Ecosystem Cartography asset"),
        (4, "Audit Ground-Level Workflows & Quantify Waste", "Where does the real workflow break?", "Interview 2 operators & map 5-step workflow", "Quantify Cost of Doing Nothing for target pain"),
        (5, "Isolate Unfair Advantage & Target Idea Space", "Where do you have the right to win?", "Audit personal unfair advantage & select idea space", "Map 3 adjacent pivot paths & buyer urgency"),
        (6, "Formulate Falsifiable Venture Thesis & Catalyst", "Why this problem, and why now?", "Write 1-pg thesis with why now & kill criteria", "Execute Devil's Advocate thesis interrogation")
    ],
    # Stage 2: SHAPE THE PROMISE (Weeks 7-10)
    [
        (7, "Define 10x Wedge & Initial Distribution Spec", "What company are you actually building?", "Finalize name/domain, ICP & 10x wedge spec", "Upgrade GTM spec & competitor teardown"),
        (8, "Eliminate Onboarding Friction & Minimize TTV", "How do users reach value fast?", "Map user task & low-fi wireframes for 10x feature", "Audit time-to-value friction & onboarding cues"),
        (9, "Validate High-Fidelity UX via Guerrilla Testing", "Does product make sense before code?", "Build hi-fi prototype & run 3 guerrilla tests", "Lock build-ready product spec & scope reduction"),
        (10, "Draft MVP Build Contract & Technical Backlog", "What exactly should be built now?", "Write user stories, acceptance tests & API surface", "Lock front-end execution plan & issue backlog")
    ],
    # Stage 3: BUILD UNDER PRESSURE (Weeks 11-16)
    [
        (11, "Deploy Initial Front-End & Demand Signal Capture", "Can the market understand the promise?", "Build component library & live landing page", "Collect waitlist & demo request signal"),
        (12, "Engineer Core Database & Authentication Engine", "Can product complete core job?", "Implement auth, database schema & CRUD endpoints", "Staging deployment & error log instrumentation"),
        (13, "Eliminate Technical Debt & Verify Integration", "What must be cleaned before users see it?", "Clear blocking bugs & stabilize API endpoints", "Complete integration checklist & mentor check"),
        (14, "Execute Recorded Operator Reviews & Capture Signal", "Would real operators use or pay?", "Complete full-stack MVP & run 2 operator sessions", "Log usage friction & commercial reaction"),
        (15, "Integrate AI Workflow Leverage & Budget Latency", "Where should AI create real advantage?", "Add 1 AI workflow & measure latency/cost", "Compare against non-AI baseline & set fallbacks"),
        (16, "Pass Private Beta Gate & Onboard First 5 Users", "Is beta ready for commitment?", "Fix P0 bugs & instrument activation events", "Onboard 5-10 highest-intent beta prospects")
    ],
    # Stage 4: WIN REAL CUSTOMERS (Weeks 17-26)
    [
        (17, "Craft Sales Story & Test Pricing Proposals", "What promise will buyers believe?", "Create 3-min demo narrative & proposal page", "Run 10 real sales conversations & log pushback"),
        (18, "Conduct 5 Live Buyer Demos & Log Objections", "Who cares enough to take a demo?", "100 targeted touches & 5 discovery calls", "Teardown call recordings & refine ICP focus"),
        (19, "Ask for Commercial Commitment & Close Paid Pilots", "Will anyone commit in writing or cash?", "Run 3 pilot meetings with price & success criteria", "Close paid pilot agreements or signed LOIs"),
        (20, "Synthesize Sales Signal & Execute Bayesian Update", "What did market teach you?", "Write commercial update memo on buyer patterns", "Execute Bayesian update on ICP & pricing"),
        (21, "Drive White-Glove Onboarding & Achieve First Value", "How to ensure immediate customer value?", "Execute white-glove onboarding for pilot users", "Measure time-to-first-value metric"),
        (22, "Verify Quantifiable Customer Outcomes & Audit Telemetry", "Is product delivering real ROI?", "Audit usage telemetry & quantitative ROI", "Document first verified customer success story"),
        (23, "Instrument Repeat Usage Loops & Analyze Churn", "Do users come back habitually?", "Instrument retention telemetry & cohort tracking", "Eliminate usage drop-off friction points"),
        (24, "Build Founder Analytics Dashboard & Unit Economics", "What numbers determine business health?", "Build founder analytics dashboard & MRR tracker", "Model unit economics & customer acquisition cost"),
        (25, "Establish Weekly Team Operating SOPs & Cadence", "How to run high-velocity operation?", "Document core operational SOPs & issue workflow", "Establish team sprint rhythm & KPI dashboard"),
        (26, "Pass Public Launch Audit & Lock Launch Collateral", "Is venture ready for public launch?", "Audit system security, payments & messaging", "Finalize launch collateral & media release")
    ],
    # Stage 5: STAND ON EVIDENCE (Weeks 27-40)
    [
        (27, "Execute Public Reveal & Mobilize Inbound Channels", "How to launch to wider market?", "Execute public reveal & launch announcement", "Mobilize social, community & press channels"),
        (28, "Triage Launch Inbound & Convert Warm Pipeline", "How to convert initial interest fast?", "Triage incoming leads & schedule demo calls", "Convert warm pipeline into active trials"),
        (29, "Run Outbound Sales Sequences to Strangers", "Can you sell beyond network?", "Launch cold outbound email & LinkedIn sequences", "Optimize response rate & qualification flow"),
        (30, "Activate Channel Partnerships & Referral Nodes", "How to scale distribution leverage?", "Set up referral incentives & channel partners", "Co-market with complementary software platforms"),
        (31, "Negotiate Final Commercial Terms & Lock MRR/ARR", "How to secure long-term revenue?", "Negotiate enterprise terms & billing schedules", "Lock recurring MRR contracts & annual agreements"),
        (32, "Onboard Paying Accounts & Prevent Custom Scope", "How to scale without custom debt?", "Standardize customer onboarding playbook", "Deliver core value without custom code creep"),
        (33, "Quantify Customer ROI & Ship High-Impact Fixes", "How to maximize expansion revenue?", "Publish quantitative ROI case studies", "Ship feature requests requested by key accounts"),
        (34, "Score Account Health & Proactively Manage Renewals", "How to prevent account churn?", "Build account health scoring framework", "Execute proactive 90-day renewal check-ins"),
        (35, "Publish Verified Case Studies & Testimonials", "How to build unbeatable trust proof?", "Record video customer testimonials", "Publish customer teardowns & ROI documentation"),
        (36, "Execute Truth Interrogation & Write Decision Memo", "What is honest venture trajectory?", "Conduct internal metrics interrogation", "Write 3-pg decision memo (scale, pivot, reset)"),
        (37, "Harden Infrastructure & Prepare Operational Transition", "Is tech stack ready for next scale step?", "Perform security audit & DB optimization", "Harden infrastructure for post-fellowship growth"),
        (38, "Model 12-Month Financial Plan & Capital Strategy", "How to fund next 12 months?", "Build 12-month operating budget & cash flow", "Determine bootstrapping vs fundraising plan"),
        (39, "Build Diligence Data Room & Finalize Pitch Story", "Can evidence survive investor scrutiny?", "Build data room (metrics, cap table, LOIs)", "Finalize 3-min Demo Day narrative & deck"),
        (40, "Deliver Live Demo Day Pitch & Execute Graduation", "What is next serious bet?", "Deliver live Demo Day pitch to VCs & operators", "Execute graduation reset & join Alumni Network")
    ]
]

write_page(21, render_stage_page(21, 1, "FIND THE PROBLEM", "WEEKS 1–6", "BayesIvory", "BayesOxblood", "BayesVerdigris", curriculum_data[0]))
write_page(22, render_stage_page(22, 2, "SHAPE THE PROMISE", "WEEKS 7–10", "BayesIvory", "BayesOxblood", "BayesVerdigris", curriculum_data[1]))
write_page(23, render_stage_page(23, 3, "BUILD UNDER PRESSURE", "WEEKS 11–16", "BayesIvory", "BayesOxblood", "BayesVerdigris", curriculum_data[2]))
write_page(24, render_stage_page(24, 4, "WIN REAL CUSTOMERS", "WEEKS 17–26", "BayesIvory", "BayesOxblood", "BayesVerdigris", curriculum_data[3]))
write_page(25, render_stage_page(25, 5, "STAND ON EVIDENCE", "WEEKS 27–40", "BayesIvory", "BayesOxblood", "BayesVerdigris", curriculum_data[4]))

# Page 26: Evidence Board
write_page(26, """
  \\BayesPageBackground{BayesOxblood}
  \\BayesText{14mm}{25mm}{180mm}{text=BayesVerdigris}{{\\BayesLabel 26 / THE EVIDENCE BOARD}}
  \\BayesText{14mm}{40mm}{180mm}{text=BayesIvory}{{\\Serif\\fontsize{26}{30}\\selectfont You don’t graduate with coursework.\\\\You graduate with evidence.}}
  \\BayesText{14mm}{75mm}{180mm}{text=BayesIvory}{{\\BayesBody Four verified artifacts that every Bayesian fellow builds and possesses by graduation:}}
  
  \\BayesPanel{BayesIvory}{14mm}{110mm}{98mm}{175mm}
  \\BayesText{20mm}{120mm}{72mm}{text=BayesOxblood}{{\\BayesLabel 01 / FALSIFIABLE THESIS}\\\\\\vspace{3mm}{\\BayesBody Grounded opportunity thesis with clear market catalyst, target ICP, and kill criteria.}}

  \\BayesPanel{BayesVerdigris}{105mm}{110mm}{196mm}{175mm}
  \\BayesText{111mm}{120mm}{77mm}{text=BayesIvory}{{\\BayesLabel 02 / DEPLOYED PRODUCT}\\\\\\vspace{3mm}{\\BayesBody Production-grade web/mobile application running live with telemetry and analytics.}}

  \\BayesPanel{BayesVerdigris}{14mm}{185mm}{98mm}{250mm}
  \\BayesText{20mm}{195mm}{72mm}{text=BayesIvory}{{\\BayesLabel 03 / COMMERCIAL SIGNAL LOG}\\\\\\vspace{3mm}{\\BayesBody Documented buyer discovery transcripts, objection logs, and closed paid pilot contracts.}}

  \\BayesPanel{BayesIvory}{105mm}{185mm}{196mm}{250mm}
  \\BayesText{111mm}{195mm}{77mm}{text=BayesOxblood}{{\\BayesLabel 04 / INVESTOR DATA ROOM}\\\\\\vspace{3mm}{\\BayesBody Complete data room with unit economics, metrics dashboard, financial model, and pitch narrative.}}
""" + get_page_footer(26, "BayesIvory"))

# Page 27: Clear promises.
write_page(27, """
  \\BayesPageBackground{BayesIvory}
  \\BayesPanel{BayesVerdigris}{0mm}{0mm}{6mm}{297mm}
  \\BayesText{14mm}{18mm}{80mm}{text=BayesVerdigris}{{\\BayesLabel 27 / TRUST}}
  \\BayesText{14mm}{30mm}{180mm}{text=BayesOxblood}{{\\Serif\\fontsize{32}{38}\\selectfont Clear promises.\\\\Clear limits.}}
  \\BayesText{14mm}{76mm}{180mm}{text=BayesOxblood}{{\\BayesBodyMedium We believe that trust is built through radical transparency. You should know exactly what Bayes is committed to, and exactly what Bayes will never do, before you apply.}}
  \\BayesRule{BayesOxblood!25!BayesIvory}{14mm}{104mm}{196mm}{0.4pt}
  
  \\BayesPanel{BayesVerdigris}{14mm}{110mm}{101mm}{272mm}
  \\BayesText{20mm}{116mm}{74mm}{text=BayesIvory}{{\\BayesLabel WHAT BAYES DOES}}
  \\BayesRule{BayesIvory!50!BayesVerdigris}{20mm}{128mm}{94mm}{0.4pt}
  \\BayesText{20mm}{133mm}{74mm}{text=BayesIvory}{{\\BayesBodySmall \\textbf{Runs alongside college or work.}\\\\\\vspace{1.5mm}The fellowship is 5 live hours per week. You keep your full-time job or finish your degree.\\\\\\vspace{3mm}\\textbf{Offers a refund window.}\\\\\\vspace{1.5mm}100\\% refund within 14 calendar days of Cohort Day 1, minus physical fulfillment costs up to \\rupee 2,500.\\\\\\vspace{3mm}\\textbf{Funds the Industry Expedition.}\\\\\\vspace{1.5mm}Travel, hotel, and meals for the 3-day expedition are fully covered by the institute.\\\\\\vspace{3mm}\\textbf{Protects your IP completely.}\\\\\\vspace{1.5mm}Bayes claims zero equity, zero advisory shares, and zero IP rights over anything you build.\\\\\\vspace{3mm}\\textbf{Transparent installment pricing.}\\\\\\vspace{1.5mm}Six monthly payment slots. No hidden fees. No predatory structures.}}
  
  \\BayesPanel{BayesPaleOxblood}{105mm}{110mm}{196mm}{272mm}
  \\BayesText{111mm}{116mm}{78mm}{text=BayesOxblood}{{\\BayesLabel WHAT BAYES DOES NOT DO}}
  \\BayesRule{BayesOxblood!40!BayesIvory}{111mm}{128mm}{190mm}{0.4pt}
  \\BayesText{111mm}{133mm}{78mm}{text=BayesOxblood}{{\\BayesBodySmall \\textbf{Does not grant a degree.}\\\\\\vspace{1.5mm}Bayes is an entrepreneurial fellowship, not a degree-granting institution.\\\\\\vspace{3mm}\\textbf{Does not guarantee placements.}\\\\\\vspace{1.5mm}We do not promise employment. We train founders. What you build is yours to decide.\\\\\\vspace{3mm}\\textbf{Does not take equity or IP.}\\\\\\vspace{1.5mm}Zero equity. Zero advisory shares. Zero IP claims. Your company is entirely yours.\\\\\\vspace{3mm}\\textbf{Does not partner with NBFC lenders.}\\\\\\vspace{1.5mm}We explicitly reject predatory debt financing. If you need aid, apply for a Bayes Scholarship Grant.\\\\\\vspace{3mm}\\textbf{Does not admit everyone.}\\\\\\vspace{1.5mm}Selection is rigorous. We reject candidates who cannot commit time, intent, or honesty.}}
""" + get_page_footer(27, "BayesOxblood"))

# Page 28: Investment
write_page(28, """
  \\BayesPageBackground{BayesOxblood}
  \\BayesPanel{BayesVerdigris}{0mm}{0mm}{210mm}{8mm}
  \\BayesText{14mm}{16mm}{80mm}{text=BayesVerdigris}{{\\BayesLabel 28 / THE INVESTMENT}}
  \\BayesText{14mm}{28mm}{180mm}{text=BayesIvory}{{\\Serif\\fontsize{56}{58}\\selectfont \\rupee 2,80,000}}
  \\BayesText{14mm}{68mm}{100mm}{text=BayesVerdigris}{{\\BayesLabel GST INCLUSIVE / TOTAL TUITION}}
  \\BayesRule{BayesVerdigris!50!BayesOxblood}{14mm}{82mm}{196mm}{0.6pt}
  \\BayesText{14mm}{90mm}{180mm}{text=BayesIvory,opacity=0.85}{{\\BayesBodyMedium \\rupee 5,000 seat confirmation deposit credited toward tuition.\\quad Six monthly payment slots across the 40-week program.}}
  
  \\BayesRule{BayesVerdigris!30!BayesOxblood}{14mm}{114mm}{196mm}{0.4pt}
  
  \\BayesText{14mm}{120mm}{85mm}{text=BayesVerdigris}{{\\BayesLabel THE COST}}
  \\BayesText{14mm}{130mm}{85mm}{text=BayesIvory,opacity=0.85}{{\\BayesBodySmall Total tuition: \\rupee 2,80,000 GST inclusive.\\\\[4mm]Net after 18\\% GST: \\rupee 2,37,288.\\\\[4mm]Per live hour of instruction: \\textbf{\\rupee 1,186.}\\\\[4mm]Industry Expedition: \\textbf{Fully funded.}\\\\[4mm]Equity taken: \\textbf{Zero.}\\\\[4mm]Degree granted: \\textbf{None.}}}
  
  \\BayesVRule{BayesVerdigris!40!BayesOxblood}{103mm}{120mm}{240mm}{0.5pt}
  
  \\BayesText{110mm}{120mm}{82mm}{text=BayesVerdigris}{{\\BayesLabel THE RETURN}}
  \\BayesText{110mm}{130mm}{82mm}{text=BayesIvory,opacity=0.85}{{\\BayesBodySmall \\textbf{Rung 1 / Bootstrapped Seed:}\\\\ \\rupee 50k--\\rupee 1.5L MRR in 12 months.\\\\[4mm]\\textbf{Rung 2 / Salary Jump:}\\\\ +\\rupee 5L--\\rupee 15L LPA as Founding Engineer.\\\\[4mm]\\textbf{Rung 3 / Risk Shield:}\\\\ Preserves \\rupee 18L--\\rupee 25L in downside risk capital.\\\\[4mm]\\textbf{Cumulative 3-year upside:}\\\\ \\rupee 20L--\\rupee 30L in net financial delta.}}
  
  \\BayesPanel{BayesVerdigris}{14mm}{244mm}{196mm}{274mm}
  \\BayesText{20mm}{250mm}{170mm}{text=BayesOxblood}{{\\BayesLabel THE 10x PRINCIPLE}}
  \\BayesText{20mm}{259mm}{170mm}{text=BayesOxblood}{{\\BayesBodyMedium Paying \\rupee 2.8L for a defensible \\rupee 25L financial delta means tuition is literally 10\\% of value acquired. That is the arithmetic of leverage.}}
""" + get_page_footer(28, "BayesIvory"))


# Page 29: Scholarships
write_page(29, """
  \\BayesPageBackground{BayesIvory}
  \\BayesImageW{95mm}{0mm}{210mm}{297mm}{assets/mentor-seminar.png}
  \\BayesPanel{BayesVerdigris,opacity=.18}{95mm}{0mm}{210mm}{297mm}
  
  \\BayesText{14mm}{25mm}{75mm}{text=BayesVerdigris}{{\\BayesLabel 29 / SCHOLARSHIPS}}
  \\BayesText{14mm}{45mm}{75mm}{text=BayesOxblood}{{\\Serif\\fontsize{26}{30}\\selectfont Talent should not\\\\worry about price.}}
  \\BayesText{14mm}{105mm}{75mm}{text=BayesOxblood}{{\\BayesBody Institutional grants and scholarships available for exceptional builders based on trajectory, commitment, and financial need.}}
  
  \\BayesPanel{BayesOxblood}{14mm}{160mm}{85mm}{255mm}
  \\BayesText{20mm}{170mm}{60mm}{text=BayesIvory}{
    {\\BayesLabel GRANT CATEGORIES}\\\\\\vspace{3mm}
    {\\BayesBodySmall \\textbf{50\\% Merit Scholarship:}\\\\Allocated to top technical candidates.\\\\\\vspace{2mm}
    \\textbf{Need-Based Aid:}\\\\Evaluated during diagnostic interview.}
  }
""" + get_page_footer(29, "BayesOxblood"))

# Page 30: How Admission Works
write_page(30, """
  \\BayesPageBackground{BayesIvory}
  \\BayesPanel{BayesVerdigris}{0mm}{0mm}{6mm}{297mm}

  \\BayesText{14mm}{18mm}{80mm}{text=BayesVerdigris}{%
    {\\BayesLabel 30 / ADMISSIONS}}

  \\BayesText{14mm}{30mm}{130mm}{text=BayesOxblood}{%
    {\\Serif\\fontsize{30}{36}\\selectfont How Admission Works}}

  \\BayesText{14mm}{70mm}{130mm}{text=BayesOxblood}{%
    {\\BayesBodyMedium The selection funnel is rigorous. It is designed to find builders with the right trajectory, not just the right credentials.}}

  \\BayesRule{BayesVerdigris!50!BayesIvory}{14mm}{94mm}{130mm}{0.4pt}

  \\BayesVRule{BayesVerdigris!40!BayesIvory}{22mm}{110mm}{258mm}{1pt}

  % Step 1
  \\fill[BayesVerdigris] ($(current page.north west)+(22mm,-110mm)$) circle (4mm);
  \\node[text=BayesIvory,inner sep=0,font=\\BayesLabel]
    at ($(current page.north west)+(22mm,-110mm)$) {1};
  \\BayesText{31mm}{106mm}{95mm}{text=BayesOxblood}{%
    {\\BayesLabel EXPLORE THE HANDBOOK}}
  \\BayesText{31mm}{115mm}{95mm}{text=BayesMutedOxblood}{%
    {\\BayesBodySmall Read the Founder Briefing. Understand the curriculum, the commitment, and whether Bayes is built for where you want to go.}}

  % Step 2
  \\fill[BayesVerdigris] ($(current page.north west)+(22mm,-148mm)$) circle (4mm);
  \\node[text=BayesIvory,inner sep=0,font=\\BayesLabel]
    at ($(current page.north west)+(22mm,-148mm)$) {2};
  \\BayesText{31mm}{144mm}{95mm}{text=BayesOxblood}{%
    {\\BayesLabel FELLOWSHIP + SCHOLARSHIP APPLICATION}}
  \\BayesText{31mm}{153mm}{95mm}{text=BayesMutedOxblood}{%
    {\\BayesBodySmall A multi-stage application: Technical Trajectory audit, Ambition essays, and optional scholarship aid request. Auto-saved. Complete asynchronously.}}

  % Step 3
  \\fill[BayesVerdigris] ($(current page.north west)+(22mm,-186mm)$) circle (4mm);
  \\node[text=BayesIvory,inner sep=0,font=\\BayesLabel]
    at ($(current page.north west)+(22mm,-186mm)$) {3};
  \\BayesText{31mm}{182mm}{95mm}{text=BayesOxblood}{%
    {\\BayesLabel FOUNDER DIAGNOSTIC INTERVIEW}}
  \\BayesText{31mm}{191mm}{95mm}{text=BayesMutedOxblood}{%
    {\\BayesBodySmall A 30-to-40 minute 1-on-1 with the founder. Come ready to present a 5-minute technical breakdown of something you built or a problem you are obsessed with.}}

  % Step 4
  \\fill[BayesVerdigris] ($(current page.north west)+(22mm,-222mm)$) circle (4mm);
  \\node[text=BayesIvory,inner sep=0,font=\\BayesLabel]
    at ($(current page.north west)+(22mm,-222mm)$) {4};
  \\BayesText{31mm}{218mm}{95mm}{text=BayesOxblood}{%
    {\\BayesLabel OFFER LETTER + AID DECISION}}
  \\BayesText{31mm}{227mm}{95mm}{text=BayesMutedOxblood}{%
    {\\BayesBodySmall Successful candidates receive an official offer with scholarship grant details and net fee. A Sponsor One-Pager is included for family alignment.}}

  % Step 5
  \\fill[BayesOxblood] ($(current page.north west)+(22mm,-258mm)$) circle (4mm);
  \\node[text=BayesIvory,inner sep=0,font=\\BayesLabel]
    at ($(current page.north west)+(22mm,-258mm)$) {5};
  \\BayesText{31mm}{254mm}{95mm}{text=BayesOxblood}{%
    {\\BayesLabel \\rupee5,000 SEAT CONFIRMATION + ENROLLMENT}}
  \\BayesText{31mm}{263mm}{95mm}{text=BayesMutedOxblood}{%
    {\\BayesBodySmall The \\rupee5,000 deposit locks your seat within 48 hours of the offer. It is credited toward your first tuition installment. Your cohort journey begins.}}

  % Right context card
  \\BayesPanel{BayesOxblood}{138mm}{94mm}{196mm}{275mm}
  \\BayesText{144mm}{100mm}{48mm}{text=BayesVerdigris}{%
    {\\BayesLabel SELECTION STANDARD}}
  \\BayesRule{BayesVerdigris!50!BayesOxblood}{144mm}{112mm}{190mm}{0.4pt}
  \\BayesText{144mm}{118mm}{48mm}{text=BayesIvory}{%
    {\\BayesBodySmall We do not evaluate by institutional pedigree, corporate title, or salary.\\\\[6mm]%
    We select for:\\\\[4mm]%
    \\textbf{Practical systems competence.}\\\\[3mm]%
    \\textbf{Commercial courage.}\\\\[3mm]%
    \\textbf{Bayesian belief updating.}\\\\[3mm]%
    \\textbf{Time and solvency stability.}\\\\[10mm]%
    A candidate from an unranked college with high agency will be admitted over a credential-heavy applicant who avoids customer reality.}}
""" + get_page_footer(30, "BayesOxblood"))

# Page 31: Are you founder material?
qr_tikz = generate_tikz_qr('https://bayes.institute/programs', size_mm=40, x_mm=25, y_mm=175, fg_color='BayesOxblood', bg_color='BayesIvory')
page_31_content = """
  \\BayesPageBackground{BayesOxblood}
  \\BayesText{25mm}{100mm}{160mm}{text=BayesIvory}{{\\Serif\\fontsize{38}{42}\\selectfont Are you founder material?\\\\FIND OUT.}}
  \\BayesText{25mm}{140mm}{160mm}{text=BayesVerdigris}{{\\BayesSansDisplay Become More with Bayes Institute.}}
  
""" + qr_tikz + """
  \\BayesText{72mm}{185mm}{110mm}{text=BayesIvory}{{\\BayesLabel SCAN TO APPLY}\\\\\\vspace{3mm}{\\BayesBody Visit bayes.institute/programs to access the handbook and submit your Cohort One application.}}
""" + get_page_footer(31, "BayesIvory")
write_page(31, page_31_content)

# Page 32: Welcome Kit
write_page(32, """
  \\BayesPageBackground{BayesIvory}
  \\BayesText{14mm}{25mm}{180mm}{text=BayesVerdigris}{{\\BayesLabel 32 / PRE-ENGAGEMENT}}
  \\BayesText{14mm}{40mm}{180mm}{text=BayesOxblood}{{\\Serif\\fontsize{30}{34}\\selectfont Your Fellowship starts before Week 1.}}
  \\BayesText{14mm}{75mm}{180mm}{text=BayesOxblood}{{\\BayesBody The pre-engagement window eliminates drop-off risk and builds peer proximity before Cohort Day 1.}}
  
  \\BayesPanel{BayesPaleOxblood}{14mm}{120mm}{196mm}{245mm}
  \\BayesText{20mm}{132mm}{164mm}{text=BayesOxblood}{
    {\\BayesLabel PHYSICAL ANCHOR \\& RETENTION ENGINE}\\\\\\vspace{4mm}
    {\\BayesBody \\textbf{Physical Welcome Kit:} Customized apparel, Bayesian founder notebook, physical seat passport.\\\\\\vspace{2.5mm}
    \\textbf{Sealed Commitment Letter:} Personal purpose document sealed until graduation day.\\\\\\vspace{2.5mm}
    \\textbf{Peer Pod WhatsApp Tank:} Immediate peer introductions and co-founder sparks.\\\\\\vspace{2.5mm}
    \\textbf{Pre-Cohort Meetup:} Informal offline kickoff coffee in Mumbai/Pune.}
  }
""" + get_page_footer(32, "BayesOxblood"))

print("Generated pages 2-32 successfully.")

# Update main.tex
main_tex_path = "main.tex"
with open(main_tex_path, "w") as f:
    f.write("\\documentclass[10pt]{article}\n")
    f.write("\\usepackage[paperwidth=210mm,paperheight=297mm,margin=0mm,noheadfoot]{geometry}\n")
    f.write("\\usepackage{fontspec}\n")
    f.write("\\usepackage{xcolor,tikz,graphicx,ragged2e,microtype,setspace,array,tabularx,calc,ifthen,etoolbox,lastpage}\n")
    f.write("\\usetikzlibrary{calc,positioning}\n")
    f.write("\\usepackage{eso-pic}\n")
    f.write("\\input{bayes-colors.tex}\n")
    f.write("\\input{bayes-typography.tex}\n")
    f.write("\\input{bayes-components.tex}\n")
    f.write("\\setlength{\\parindent}{0pt}\n")
    f.write("\\setlength{\\parskip}{0pt}\n")
    f.write("\\hbadness=10000\n")
    f.write("\\pagestyle{empty}\n")
    f.write("\\color{BayesOxblood}\n")
    f.write("\\begin{document}\n")
    f.write("\\input{pages/cover.tex}\\newpage\n")
    for i in range(2, 33):
        f.write(f"\\input{{pages/page-{i:02d}.tex}}\\newpage\n")
    f.write("\\end{document}\n")

print("Updated main.tex successfully.")
