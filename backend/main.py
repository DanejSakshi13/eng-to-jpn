from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

app = FastAPI()

# Load model and tokenizer
model_name = "facebook/nllb-200-distilled-600M"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

tokenizer.src_lang = "eng_Latn"
tgt_lang_token_id = tokenizer.convert_tokens_to_ids("jpn_Jpan")

class InputText(BaseModel):
    text: str

@app.post("/translate")
def translate(data: InputText):
    if not data.text.strip():
        return {"translation": "Please enter some English text."}
    inputs = tokenizer(data.text, return_tensors="pt", truncation=True)
    output = model.generate(**inputs, forced_bos_token_id=tgt_lang_token_id)
    translation = tokenizer.decode(output[0], skip_special_tokens=True)
    return {"translation": translation}