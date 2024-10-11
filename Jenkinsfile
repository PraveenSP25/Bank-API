pipeline {
    agent any
    // parameters {
    //     choice(name: 'VERSION', choices: ['0.5', '1.0', '2.0'], description: '')
    //     booleanParam(name: 'excecuteTest', defaultValue: true, description: 'test')
    // }
    stages {
        stage('Dev') {
            // when {
            //     expression {
            //         params.excecuteTest
            //     }
            // }
            steps {
                echo 'Hello World dev'
            }
        }
        stage('test') {
            steps {
                echo 'Application is testing'
                // echo "Testing application version is ${params.VERSION}"
            }
        }
    }
}
