import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def create_resume():
    # Setup document
    pdf_path = r"c:\Users\yaswa\OneDrive\Desktop\PROJECTS\MY PORTFOLIO\public\assets\Gokavarapu_Yaswanth_Resume.pdf"
    os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
    
    # 0.5 inch margins for maximum space utilization on 1 page
    margin = 36 # 36 points = 0.5 inches
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=margin,
        bottomMargin=margin
    )
    
    styles = getSampleStyleSheet()
    
    # Define custom styles
    primary_color = colors.HexColor("#111827") # Dark grey
    secondary_color = colors.HexColor("#DC2626") # Accent Red
    text_color = colors.HexColor("#374151") # Charcoal
    muted_color = colors.HexColor("#6B7280") # Secondary Text
    
    styles.add(ParagraphStyle(
        name='ResumeName',
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
        alignment=TA_CENTER,
        spaceAfter=2
    ))
    
    styles.add(ParagraphStyle(
        name='ResumeTitle',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=secondary_color,
        alignment=TA_CENTER,
        spaceAfter=6
    ))
    
    styles.add(ParagraphStyle(
        name='ResumeContact',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=text_color,
        alignment=TA_CENTER,
        spaceAfter=8
    ))
    
    styles.add(ParagraphStyle(
        name='SectionHeaderStyle',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=primary_color,
        spaceBefore=6,
        spaceAfter=2,
        keepWithNext=True
    ))
    
    styles.add(ParagraphStyle(
        name='BodyStyle',
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=text_color,
        spaceAfter=4
    ))
    
    styles.add(ParagraphStyle(
        name='BodyBold',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=primary_color,
    ))

    styles.add(ParagraphStyle(
        name='BodyItalic',
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=12,
        textColor=muted_color,
    ))
    
    styles.add(ParagraphStyle(
        name='BulletStyle',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=text_color,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=3
    ))
    
    story = []
    
    # 1. Header
    story.append(Paragraph("GOKAVARAPU YASWANTH", styles['ResumeName']))
    story.append(Paragraph("Frontend Developer (UI/UX) &nbsp;|&nbsp; Full Stack Developer &nbsp;|&nbsp; AI Engineer", styles['ResumeTitle']))
    
    # Contact Info
    contact_text = (
        "Hyderabad, India &nbsp;•&nbsp; "
        "yaswanthgokavarapu97@gmail.com &nbsp;•&nbsp; "
        "+91 91778 01344 &nbsp;•&nbsp; " # Added a sample valid phone pattern as requested
        "github.com/suryagokvarpu1-coder &nbsp;•&nbsp; "
        "linkedin.com/in/gokavarapu-yaswanth-128758383/"
    )
    story.append(Paragraph(contact_text, styles['ResumeContact']))
    
    # Helper to add section title and thin divider
    def add_section_header(title):
        story.append(Paragraph(title.upper(), styles['SectionHeaderStyle']))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#E5E7EB"), spaceBefore=2, spaceAfter=6))
        
    # 2. Professional Summary
    add_section_header("Professional Summary")
    summary_text = (
        "Ambitious Computer Science Engineering student and Frontend Developer (UI/UX) with hands-on experience "
        "designing and developing responsive, interactive, and user-centric web applications. Skilled in React.js, "
        "JavaScript, and Firebase, with a strong focus on frontend architecture and full-stack integration. Actively "
        "engaged in AI application development, prompt engineering, and LLM integrations to create intelligent digital products."
    )
    story.append(Paragraph(summary_text, styles['BodyStyle']))
    story.append(Spacer(1, 4))
    
    # 3. Experience
    add_section_header("Experience")
    
    # Yudi AI Labs
    exp_header_table = Table(
        [[
            Paragraph("<b>Frontend Developer (UI/UX) Intern</b> - <i>Yudi AI Labs</i>", styles['BodyStyle']),
            Paragraph("<b>Present</b>", ParagraphStyle('RightText', parent=styles['BodyStyle'], alignment=TA_RIGHT))
        ]],
        colWidths=[400, 140]
    )
    exp_header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(exp_header_table)
    story.append(Spacer(1, 3))
    
    bullets = [
        "Contribute to the design and development of modern, responsive, and user-centric web applications.",
        "Develop interactive user interfaces utilizing React.js, HTML5, CSS3, and JavaScript.",
        "Design clean, modern, and user-friendly UI/UX experiences in alignment with usability best practices.",
        "Build reusable, modular, and scalable frontend components to ensure code maintainability.",
        "Optimize web applications for performance, accessibility (A11y), and responsiveness across desktop and mobile devices.",
        "Collaborate closely with designers and developers using Figma to deliver seamless user interactions."
    ]
    for bullet in bullets:
        story.append(Paragraph(f"•&nbsp;&nbsp;{bullet}", styles['BulletStyle']))
    story.append(Spacer(1, 4))
    
    # 4. Featured Projects
    add_section_header("Featured Projects")
    
    projects = [
        ("BeatFlow – Music Streaming Platform", "React.js, JavaScript, Firebase, CSS3, HTML5", "https://beatflow-254ba.web.app/#home", 
         "A modern music streaming web application featuring user authentication, playlist management, Spotify-inspired premium UI, and dynamic media playback control engines."),
        ("Qubic Council – AI Collaboration Platform", "React.js, JavaScript, Tailwind CSS, Firebase, Vercel", "https://qubic-council.vercel.app", 
         "A modern web platform designed to deliver a responsive, multi-LLM AI collaboration workspace with smooth navigation, optimized performance, and scalable architecture."),
        ("Agri AI – Smart Agriculture Platform", "React.js, JavaScript, AI Integration, Firebase, Vercel", "https://agri-ai-platform-rho.vercel.app/", 
         "An AI-powered smart agriculture platform helping farmers improve productivity through crop recommendations, soil analysis, and yield prediction visualizations.")
    ]
    
    for title, tech, link, desc in projects:
        proj_header = Table(
            [[
                Paragraph(f"<b>{title}</b> &nbsp;|&nbsp; <font color='#6B7280'><i>{tech}</i></font>", styles['BodyStyle']),
                Paragraph(f"<font color='#DC2626'><a href='{link}'>Live Link</a></font>", ParagraphStyle('RightText2', parent=styles['BodyStyle'], alignment=TA_RIGHT))
            ]],
            colWidths=[420, 120]
        )
        proj_header.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 0),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(proj_header)
        story.append(Paragraph(desc, styles['BulletStyle']))
        story.append(Spacer(1, 2))
    story.append(Spacer(1, 4))
    
    # 5. Technical Skills
    add_section_header("Technical Skills")
    skills_data = [
        [Paragraph("<b>Frontend:</b>", styles['BodyStyle']), Paragraph("HTML5, CSS3, JavaScript, React.js, Responsive Web Design, UI/UX Design", styles['BodyStyle'])],
        [Paragraph("<b>Backend & Databases:</b>", styles['BodyStyle']), Paragraph("Node.js, REST APIs, Firebase", styles['BodyStyle'])],
        [Paragraph("<b>Programming Languages:</b>", styles['BodyStyle']), Paragraph("Python, JavaScript", styles['BodyStyle'])],
        [Paragraph("<b>Tools & Platforms:</b>", styles['BodyStyle']), Paragraph("Git, GitHub, Firebase, Vercel, VS Code, Figma", styles['BodyStyle'])],
        [Paragraph("<b>AI & Development:</b>", styles['BodyStyle']), Paragraph("Prompt Engineering, AI Application Development, Research & Development, LLMs, AI APIs", styles['BodyStyle'])]
    ]
    skills_table = Table(skills_data, colWidths=[140, 400])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 4))
    
    # 6. Education
    add_section_header("Education")
    
    edu_data = [
        ("Bachelor of Technology (B.Tech) - Computer Science Engineering", "Malla Reddy (MR) Deemed to be University", "2025 – Present (Ongoing)"),
        ("Intermediate (MPC)", "Shri Shiridi Sai Junior College", "2023 – 2025 &nbsp;|&nbsp; Score: 75.2%"),
        ("Schooling", "Bhashyam E.M. School", "Completed &nbsp;|&nbsp; Score: 86.5%")
    ]
    
    for degree, school, duration in edu_data:
        edu_table = Table(
            [[
                Paragraph(f"<b>{degree}</b><br/><font color='#6B7280'>{school}</font>", styles['BodyStyle']),
                Paragraph(f"<b>{duration}</b>", ParagraphStyle('RightTextEdu', parent=styles['BodyStyle'], alignment=TA_RIGHT))
            ]],
            colWidths=[380, 160]
        )
        edu_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 3),
            ('TOPPADDING', (0,0), (-1,-1), 0),
        ]))
        story.append(edu_table)
    story.append(Spacer(1, 4))
    
    # 7. Certifications & Achievements & Languages
    # Create a 3-column block for Certifications, Achievements, Languages to make it highly compact
    add_section_header("Certifications, Achievements & Languages")
    
    extra_details = Table(
        [[
            Paragraph("<b>CERTIFICATIONS</b><br/>• AWS Cloud practitioner (Prep)<br/>• Google Cloud Practitioner (Prep)<br/>• Meta Front-End Developer Course", styles['BodyStyle']),
            Paragraph("<b>ACHIEVEMENTS</b><br/>• Hackathon podium finishes<br/>• Active open-source contributions<br/>• Built 5+ web & AI projects", styles['BodyStyle']),
            Paragraph("<b>LANGUAGES</b><br/>• English (Fluent)<br/>• Telugu (Native)", styles['BodyStyle'])
        ]],
        colWidths=[180, 180, 180]
    )
    extra_details.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(extra_details)
    
    # Build document
    doc.build(story)
    print("Resume PDF generated successfully at:", pdf_path)

if __name__ == "__main__":
    create_resume()
