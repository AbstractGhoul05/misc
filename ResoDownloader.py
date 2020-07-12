import requests
'''
  Program to download PDF files from Resonance Website
'''
file_code = str(input('Enter the code of the file you want: '))

pdf_reso = requests.get(f'https://www.onlinereso.in/api/getEbook?note_id={file_code}', allow_redirects=True)

open(f'{file_code}.pdf', mode='wb').write(pdf_reso.content)
