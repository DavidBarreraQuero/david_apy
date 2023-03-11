class RequestSend {
    static GET(dataUser){
        fetch(dataUser.url, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => {
            return response.json()
        }).then(data => dataUser.callback(data))
    }

    static POST(dataUser){
        this.send(dataUser.url, "POST", dataUser.body, dataUser.callback);
    }

    static PUT(dataUser){
        this.send(dataUser.url, "PUT", dataUser.body, dataUser.callback);
    }

    static DELETE(dataUser){
        this.send(dataUser.url, "DELETE", dataUser.body, dataUser.callback);
    }
        
    static send(url, methodSend, bodySend, callback){
        fetch(url, {
            method: methodSend,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodySend)
        }).then(response => {
            return response.json()
        }).then(data => callback(data))
    }
}