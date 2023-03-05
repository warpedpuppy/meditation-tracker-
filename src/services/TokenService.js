const TokenService = {
	tokenName: 'token',
	checkForToken: function () {
		return !!localStorage.getItem(this.tokenName)
	}
}
export default TokenService;