# RiverSide Clone


## Service template
``` 
        Service.post("/register",async (req : Request,res : Response)=>{
            try {

            res.status(201).json({
                msg : ""
            })
                
            }catch{
                res.status(500).json({
                    msg : "Server error"
                })
            }
        })

```