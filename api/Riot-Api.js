const TeemoJS = require("teemojs");
const api = TeemoJS();

module.exports = {
    getSummonerNameFromPuuid,
    getSummonerTftMatchHistory,
    getSummonerPuuid,
    getTftRank,
};

async function getSummonerIdFromSummonerName(summonerName) {
    const summoner = await api.get("na1", "summoner.getBySummonerName", summonerName);
    console.log(summoner.id)
    return summoner.id;
}

async function getSummonerPuuidHelper(summonerName) {
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

async function getTftRankHelper(summonerId) {
    const rank =  await api.get("na1", "tftLeague.getLeagueEntriesForSummoner", summonerId);
    console.log(rank);
    return rank;
}

async function getTftRank(req, res) {
    return getSummonerIdFromSummonerName(req.params.summonername)
        .then(summonerId => getTftRankHelper(summonerId))
        .then(rank => { res.json(rank) });
}

async function getSummonerPuuid(req, res) {
    const summoner = await api.get("na1", "summoner.getBySummonerName", req.params.summonername);
    await res.json(summoner.puuid);
}

async function getSummonerNameFromPuuid(req, res) {
    const summoner = await api.get("na1", "summoner.getByPUUID", req.params.puuid);
    console.log("Summoner name" + summoner.name);
    await res.json(summoner.name);
}

async function getSummonerTftMatchHistory(req, res) {
    return getSummonerPuuidHelper(req.params.summonername)
        .then(puuid => getSummonerTftMatchIds(puuid))
        .then(matchIds => getTftMatchHistory(matchIds))
        .then(history => {
            let games = [];
            for(let match of history) games.push(match.info);
            console.log("match history" + games)
            res.json(games);
        })
        .catch(console.log)
}