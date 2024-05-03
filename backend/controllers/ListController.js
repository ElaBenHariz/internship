const List=require("../models/List")
const Card=require("../models/Card")


const ListController ={
    getLists:async(req,res)=>{
        const projectId=req.params.projectId
        const Lists= await List.find({Project:projectId})
        res.send(Lists)
    },

    CreateList:async (req,res)=>{
        const Project=req.params.projectId;
        const {name}=req.body;
        console.log(name)
        const Lists=await List.find({Project:Project})
        const position=(Lists.length)+1;
        try{
            const NewList=await  List.create({name,position,Project});
            res.send(NewList);
        }
        catch(error){
            res.send('error while creating the list')
        }
         

    },
    deleteList:async (req,res)=>{
        const listId = req.params.listId;
        const deletedList =await List.findOneAndDelete({_id: listId}).then(async(deletedList) =>
        {
        if (deletedList) {
            await List.updateMany({ position: { $gt: deletedList.position } },  { $inc: { position: -1 } });
            res.send( await List.find());
        } 
        else {
            res.send('No SUCH List Found with this project.');
        }
        
        })
        .catch((error) => {
            console.error(error);
        });
    },
    updateName: async (req, res) => {
        try {
            const listId = req.params.listId;
            const {name} = req.body;
            const updatedList = await List.findByIdAndUpdate(listId, { name }, { new: true });
            const lists = await List.find();
            res.send(lists); 
        } catch (error) {
            console.error(error);
            res.status(500).send("Error while updating the name");
        }},
    MoveList: async (req,res)=>{
        

    },
     addCardToList : async (req, res) => {
        const  card  = req.body;
        console.log(card)
        const list = await List.findById(req.params.listId);
    
        if (!list) {
            return res.send("List doesn't exist");
        }
    
        try {
           await list.cards.push(card)
            await list.save()
            return res.send( await List.find());
        } catch (error) {
            return res.status(500).send("Error saving card to the list");
        }
    },
    moveCardToList: async (req, res) => {
        const { id_current_list, card_id, new_dest } = req.body;
    
        const listCurrent=await List.findById(id_current_list)

        const card=await listCurrent.cards.find(e=>e._id.toString().includes(card_id))
        const cardIndex=await listCurrent.cards.findIndex(e=>e._id.toString().includes(card_id))
        const listDes=await List.findById(new_dest)

        
        if(card && listDes)
   {     listDes.cards.push({Title:card.Title,Description:card.Description,Labels:card.Labels,Files:card.Files })
        await  listDes.save()

       await listCurrent.cards.splice(cardIndex,1)
       await listCurrent.save()  
   return res.send(await List.find())}

        else return res.send("card not found")
      
    },
    deleteCardFromList : async(req,res)=>{
        const { id_current_list, card_id } = req.body;
    
        const listCurrent=await List.findById(id_current_list)
        const cardIndex=await listCurrent.cards.findIndex(e=>e._id.toString().includes(card_id))

        const card=await listCurrent.cards.find(e=>e._id.toString().includes(card_id))
        if(card && listCurrent){
            await listCurrent.cards.splice(cardIndex,1)
            await listCurrent.save()  
        return res.send(await List.find())
    
    } else res.send("card not found")
        },

  
        

    }
    

module.exports=ListController;