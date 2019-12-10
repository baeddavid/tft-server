const TeemoJS = require("teemojs");
const api = TeemoJS();

module.exports = {
    getSummonerNameFromPuuid,
    getSummonerTftMatchHistory,
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

async function getSummonerNameFromPuuid(req, res) {
    const summoner = await api.get("na1", "summoner.getByPUUID", req.params.puuid);
    console.log(summoner.name);
    await res.json(summoner.name);
}

async function getSummonerTftMatchHistory(req, res) {
    return getSummonerPuuid(req.params.summonername)
        .then(puuid => getSummonerTftMatchIds(puuid))
        .then(matchIds => getTftMatchHistory(matchIds))
        .then(history => {
            let games = [];
            for(let match of history) games.push(match.info);
            console.log(games)
            res.json(games);
        })
        .catch(console.log)
}