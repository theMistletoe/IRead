var BookReportToken = artifacts.require("./BookReportToken.sol");

module.exports = function (deployer) {
    deployer.deploy(BookReportToken, "BookReportToken", "BRT");
};