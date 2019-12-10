const TeemoJS = require("teemojs");
const api = TeemoJS("RGAPI-f7625f51-530f-4a07-8d79-3b1a145b3639");

module.exports = {
    getSummonerPuuid,
    getSummonerTftMatchHistory
};

async function getSummonerPuuid(summonerName) {
    const summoner = await api.get("na1", "summoner.getBySummonerName", summonerName);
    return summoner.puuid;
}

async function getSummonerTftMatchIds(puuid) {
    const tftMatches = await api.get("AMERICAS", "tftMatch.getMatchIdsByPUUID", puuid);
    return  tftMatches;
}

async function getTftMatchHistory(tftMatchIds) {
    const tftMatchHistory = [];
    for(let i = 0; i < tftMatchIds.length; i++) {
        let match = await api.get("AMERICAS", "tftMatch.getMatch", tftMatchIds[i]);
        tftMatchHistory.push(match);
    }
    return tftMatchHistory;
}

async function getSummonerNameFromPuuid(puuid) {
    const summoner = await api.get("na1", "summoner.getByPUUID", puuid);
    return summoner.name;
}

async function getSummonerTftMatchHistory(summonerName) {
    return getSummonerPuuid(summonerName)
        .then(function(puuid) { return getSummonerTftMatchIds(puuid) })
        .then(function(matchIds) { return getTftMatchHistory(matchIds) })
        .then(function(history) {
            let games = [];
            for(let match of history) games.push(match.info);
            return games;
        });
}