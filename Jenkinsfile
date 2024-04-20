pipeline {
	agent any
	stages {
		stage('build') {
			steps {
				sh 'bun run build'
			}
		}
		stage('test') {
			steps {
				sh 'bun run test'
			}
		}
		stage('deploy') {
			steps {
				sh 'bun run deploy'
			}
		}
	}
	post {
		failure {
			sh 'echo "Failed"'
		}
		success {
			sh 'echo "Success"'
		}
	}
}