const asyncHandler = require('express-async-handler');
const List = require('../../models/List');

//@desc Create Movie
//@route POST /api/list
//@acces Private
const CreateList = asyncHandler( async (req, res) => {
        if(req.user.isAdmin){
            const newList = new List(req.body);
            try {
                const savedList = await newList.save();
                res.status(201).json(savedList);
            } catch (error) {
                res.status(500)
                throw new Error(error);
            }
        }else{
            res.status(403)
            throw new Error('Your not allowed !');
        }
    
})

//@desc Delete Movie
//@route POST /api/list/id
//@acces Private
const DeleteList = asyncHandler( async (req, res) => {
    if(req.user.isAdmin){
        try {
            const savedList = await List.findByIdAndDelete(req.params.id);
            res.status(201).json('The list has been delete ...');
        } catch (error) {
            res.status(500)
            throw new Error(error);
        }
    }else{
        res.status(403)
        throw new Error('Your not allowed !');
    }

})


//@desc GET Movie
//@route POST /api/list/
//@acces Private

const GetMovies =  asyncHandler(async (req, res)=> {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;

    let list = [];

    try {
        if(typeQuery){
            if(genreQuery){
                list = await List.aggregate([
                    { $sample: {size: 10}},
                    {$match : {type: typeQuery, genre: genreQuery}}
                ])
            }else{
                list = await List.aggregate([
                    { $sample: {size: 10}},
                    {$match : {type: typeQuery}}
                ])
            }

        }else{
            list = await List.aggregate([{ $sample: {size: 10}}])
        }
        res.status(200).json(list);
    } catch (error) {
        res.status(400)
        throw new Error(error);
    }
})


module.exports = {
    CreateList,
    DeleteList,
    GetMovies,
 
}