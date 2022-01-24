export class importadorClass {

    jsonFunctions = {};

    importar(...params){

        let aux = [];

        Object.keys(params[0]).forEach( (key) =>{
            aux.push({id: params[0][key], name: key})
            console.log({id: params[0][key], name: key});
        });

        // for (let index = 0; index < aux.length; index++) {
          
        //     this.getFunctions(aux[index].id).then((result) => {
        //         return this.jsonFunctions;
        //     })
            
        // }

    }


    getFunctions = (idFunction) => {
        let myPromise = new Promise(function(myResolve,myReject) 
        {
            const xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", () => {
                if (xhr.readyState === 4 && xhr.status === 200){
                    let result=eval('('+xhr.responseText+')');
                    new Function (`return ${result[0].code}`)
                    myResolve(true);
                }else{
                    myReject(false);
                }
            });
            xhr.open("GET", `http://localhost:3000/exportFunctions?idFunction=${idFunction}`);
            xhr.send();
        });  
        return myPromise;
    }

}