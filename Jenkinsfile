node {
    checkout scm
    docker.withRegistry('https://registry.hub.docker.com','dockerhublogin') {
        def image = docker.build('12358ann/api')
        image.push()
    }
}
