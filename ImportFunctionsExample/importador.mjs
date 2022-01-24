class importadorClass {

    jsonFunctions = {};

    importador = async(...params) =>{

        let auxList = [];

        Object.keys(params[0]).forEach( (key) =>{
            auxList.push({id: params[0][key], name: key})
        });

        for (let index = 0; index < auxList.length; index++) {
          
            await this.getFunctions(auxList[index].id).then((result) => {

                let auxFunction = new Function (`return ${result}`)();
                
                this.jsonFunctions[auxList[index].name] = auxFunction;

            });
            
        }

        return this.jsonFunctions;

    }


    getFunctions = (idFunction) => {

        let myPromise = new Promise(function(myResolve,myReject) 
        {
            const xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState === 4 && xhr.status === 200){
                    let result=eval('('+xhr.responseText+')');
                    myResolve(result[0].code);
                }
            });
            xhr.open("GET", `http://localhost:3000/exportFunctions?idFunction=${idFunction}`);
            xhr.send();
        });  
        return myPromise;
    }

}

export default importadorClass;