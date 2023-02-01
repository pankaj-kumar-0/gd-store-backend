class APIfeatures{
    constructor(query , queryString ){
        this.query = query,
        this.queryString = queryString
    }

    searching(){
        if(this.queryString.keyword){
            const  keyword = {
                name :{
                    $regex : this.queryString.keyword,
                    $options : "i"
                }
            }
            // console.log(keyword);
            this.query = this.query.find(keyword);
        }
        return this
    }

    filtering(){
        const copy_query_str = {...this.queryString}

        // console.log(copy_query_str);
        const extraFields = ["keyword", "limit", "page"];
        extraFields.forEach(element => {
            delete copy_query_str[element]
        });
        // console.log(copy_query_str); 
        
        let covert_str = JSON.stringify(copy_query_str);
        covert_str = covert_str.replace(/\b(gt|gte|lt|lte)\b/g, (value) => `$${value}`);

        this.query = this.query.find(JSON.parse(covert_str));

        return this
    }

    pagination(){
        const page = this.queryString.page * 1 || 1 ;
        const limit = this.queryString.limit *1 || 3;
        const skip = (page - 1)* limit

        this.query = this.query.limit(limit).skip(skip);
        return this
    }
}

module.exports = APIfeatures;