from fastapi import FastAPI, HTTPException
from supabase_config import supabase
from ai_integration import get_ai_recommendation

app = FastAPI()

# Fetch user data from Supabase
def fetch_user_data(user_id):
    response = supabase.table("users").select("*").eq("id", user_id).execute()
    if response.data:
        return response.data[0]
    return None

# Store new user profiles in Supabase
@app.post("/user/create")
def create_user_profile(user_id: str, age: int, weight: float, height: float, menopause_status: str):
    data = {
        "id": user_id,
        "age": age,
        "weight": weight,
        "height": height,
        "menopause_status": menopause_status
    }
    response = supabase.table("users").insert(data).execute()
    return {"message": "User profile created successfully", "data": response.data}

# Get AI-powered workout & nutrition recommendations
@app.post("/ai/recommendation")
def get_recommendation(user_id: str):
    user_data = fetch_user_data(user_id)
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")

    ai_response = get_ai_recommendation(user_data)
    return ai_response
