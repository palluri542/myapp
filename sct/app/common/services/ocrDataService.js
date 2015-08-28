angular.module('ocrApp.dataService', []).factory('dataFactory', function($http) {

    var urlBase = 'http://chi-lx-brokrecsdev01:17001/apiOcr';
    
    var currentUser='TBD';
    //
    //Returns a list of FiaProfileListItem
    var getFiaEntityList = function() {
        return $http.get(urlBase + '/' + 'rstUnmatchedFiaProfileKeys');
    };
    var getFiaEntityListByDays = function(lastNumDays) {
        return $http.post(urlBase + '/' + 'unmatchedFiaProfileKeysDaysFiltered', lastNumDays);
    };
    var getSubmissionSummaryData = function() {
  console.log("DATASEERVICE  REQSumData") ;
        return $http.get(urlBase + '/' + 'submissionSummary');
    };
    var getTriggerSummaryData = function() {
        return $http.get(urlBase + '/' + 'triggerSummary');
    };
    var ocrSchedule = function() {
        return $http.get(urlBase + '/' + 'schedule');
    };
    var fiaStatus = function() {
        return $http.get(urlBase + '/' + 'fiaStatus');
    };
    var ocrStatus = function() {
        return $http.get(urlBase + '/' + 'ocrStatus');
    };
    var populateFia = function(ocrProfileId) {
        return $http.post(urlBase + '/' + 'fiaProfileLink', ocrProfileId);
    };
    //Returns ProfileMatchSelection(LegalEntityCoreData, List<LegalEntityCoreData>)
    var populatePossibles = function(ocrProfileId) {
        return $http.post(urlBase + '/' + 'rstNcrChoicesForProfileId', ocrProfileId);
    };
    //ncrNameQuery
     var fiaNameQuery = function(qryTxt) {
        return $http.post(urlBase + '/' + 'fiaName', qryTxt);
    };
    var ncrNameQuery = function(qryTxt) {
        return $http.post(urlBase + '/' + 'ncrName', qryTxt);
    };
    
    var commitMatch = function(profileId, ncrNewedgePartyId,ncrPartyKey) {
        var leMatch = {
            ocrProfileId: profileId,
            newedgePartyId: ncrNewedgePartyId,
            partyKey: ncrPartyKey,
            requestedBy: 'UI'
        };
        return $http.post(urlBase + '/' + 'matchLegalEntity', leMatch);
    };
    
    var excelActiveClients = function(email) {
        return $http.post(urlBase + '/' + 'excelActiveClients', email);
    };
    var excelCftcForm102Exception = function(email) {
        return $http.post(urlBase + '/' + 'excelCftcForm102Exception', email);
    };
    var excelOverallClients = function(email) {
        return $http.post(urlBase + '/' + 'excelOverallClients', email);
    };
    var excelProfilesWithoutControllers = function(email) {
        return $http.post(urlBase + '/' + 'excelProfilesWithNoController', email);
    };
    var excelUnlinkedAccounts = function(email) {
        return $http.post(urlBase + '/' + 'excelUnlinkedAccounts', email);
    };
    var excelFiaNcrRecon = function(email) {
        return $http.post(urlBase + '/' + 'excelFiaNcrRecon', email);
    };
    var matchAccounts = function() {
        return $http.get(urlBase + '/' + 'matchAccounts');
    };
    var matchLeis = function() {
        return $http.get(urlBase + '/' + 'matchLeis');
    };   
    var refreshFiaData = function() {
        return $http.get(urlBase + '/' + 'refreshFiaData');
    };
    var retrieveFiaBatch = function() {
        return $http.get(urlBase + '/' + 'retrieveFiaBatchFile');
    };
    var requestRetrieveGmiTriggers = function() {
        return $http.get(urlBase + '/' + 'retrieveGmiTriggerFiles');
    };
    var pauseTriggerSubmission = function() {
        return $http.post(urlBase + '/' + 'pauseTriggerSubmission', currentUser);
    };
    var resumeTriggerSubmission = function() {
        return $http.post(urlBase + '/' + 'resumeTriggerSubmission', currentUser);
    };
    var submitGmiTriggers = function() {
        return $http.post(urlBase + '/' + 'submitGmiTriggers', currentUser);
    };
    
   
    return {
        commitMatch: function(ocrProfileId, ncrNewedgePartyId, ncrPartyKey) {
            return commitMatch(ocrProfileId, ncrNewedgePartyId, ncrPartyKey);
        },
        excelActiveClients: function(email) {
            return excelActiveClients(email);
        },
        excelCftcForm102Exception: function(email) {
            return excelCftcForm102Exception(email);
        },
        excelFiaNcrRecon: function(email) {
            return excelFiaNcrRecon(email);
        },
        excelOverallClients: function(email) {
            return excelOverallClients(email);
        },
        excelProfilesWithoutControllers: function(email) {
            return excelProfilesWithoutControllers(email);
        },
        excelUnlinkedAccounts: function(email) {
            return excelUnlinkedAccounts(email);
        },
        fiaEntityList: function() {
            return getFiaEntityList();
        },
        fiaNameQuery: function(qryTxt) {
            return fiaNameQuery(qryTxt);
        }, 
        fiaStatus: function() {
            return fiaStatus();
        },
        matchAccounts: function() {
            return matchAccounts();
        },
        matchLeis: function() {
            return matchLeis();
        },
        ncrNameQuery: function(qryTxt) {
            return ncrNameQuery(qryTxt);
        }, 
        ncrPossibles: function(ocrProfileId) {
            return populatePossibles(ocrProfileId);
        }, 
        populateFia: function(ocrProfileId) {
            return populateFia(ocrProfileId);
        }, 
        ocrSchedule: function() {
            return ocrSchedule();
        },
        ocrStatus: function() {
            return ocrStatus();
        },
        requestOverallMatchSpreadsheet: function() {
            return requestOverallMatchSpreadsheet();
        },
        requestProfilesWithoutControllers: function() {
            return requestProfilesWithoutControllers();
        },
        retrieveFiaBatch: function() {
            return retrieveFiaBatch();
        },
        requestRetrieveGmiTriggers: function(){
            return requestRetrieveGmiTriggers();
        },
        refreshFiaData: function() {
            return refreshFiaData();
        },
        getSubmissionSummaryData: function() {
            return getSubmissionSummaryData();
        },
        getTriggerSummaryData: function() {
            return getTriggerSummaryData();
        },
        pauseTriggerSubmission: function(currentUser) {
            return pauseTriggerSubmission(currentUser);
        },
        resumeTriggerSubmission: function(currentUser) {
            return resumeTriggerSubmission(currentUser);
        },
        submitGmiTriggers: function(currentUser) {
            return submitGmiTriggers(currentUser);
        }
    };
});
