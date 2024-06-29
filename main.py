# import pdf2final_list
# import text2ppt
# import template
# s=input("Enter a topic: ")
# x,topic=pdf2final_list.process([s])
# template.ppt(topic,x)
import os
from fastapi.responses import FileResponse
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from hugchat_script import generate_presentation_until_success
import template_2

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for simplicity. Adjust in production.
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

class TopicRequest(BaseModel):
    topic: str
    num_slides: int
    headers: str
    template: str

@app.post("/generate-ppt/")
async def generate_ppt(request: TopicRequest):
    try:
        s = request.topic
        num_slides = request.num_slides
        headers = request.headers
        template_choice = request.template
        print("Generating ppt..")
        presentation_data = generate_presentation_until_success(s, num_slides,headers)
        if template_choice=="template_1":
            filename=template_2.ppt(presentation_data,num_slides,"Ey_template_final.pptx")
        else:
            filename=template_2.ppt(presentation_data,num_slides,"Ey_template_final2.pptx")
        return {"message": "PowerPoint presentation created successfully.","filename":filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/download/{filename}")
async def download_file(filename: str):
    file_path = os.path.join("", filename)
    if os.path.exists(file_path):
        return FileResponse(path=file_path, filename=filename)
    else:
        raise HTTPException(status_code=404, detail="File not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
