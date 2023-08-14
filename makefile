deploy-app:
	@printf "\033[0;32m>>> Deploying app to prod\033[0m\n"
	yarn run build \
	&& serverless client deploy