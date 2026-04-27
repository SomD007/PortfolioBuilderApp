from pydantic import BaseModel

class productDTO(BaseModel): #DTO = Data Transfer Object
    id: int
    title: str
    price: int = 0
    count: int = 0
