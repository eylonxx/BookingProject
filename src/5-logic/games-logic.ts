
import dal from "../2-utils/dal";
import { ResourceNotFound, ValidationError } from "../4-models/errors-model";
import GameModel from "../4-models/game-model";

// Get all games: 
async function getAllGames(): Promise<GameModel[]> {
    const games = await dal.fetchGames();
    return games;
}

// Get one game by id: 
async function getOneGame(id: number): Promise<GameModel> {
    const games = await dal.fetchGames(); // Won't be needed on real database.
    const game = games.find(g => g.id === id);

    // If id not found: 
    if (!game) {
        throw new ResourceNotFound(id);
    }

    return game;
}

// Add new game:
async function addGame(game: GameModel): Promise<GameModel> {

    // Validate POST: 
    const errors = game.validatePost();
    if (errors) {
        throw new ValidationError(errors);
    }

    const games = await dal.fetchGames(); // Won't be needed on real database.
    game.id = games[games.length - 1].id + 1; // Generate new id.
    games.push(game); // Add to array.
    await dal.saveGames(games); // Save back to file.
    return game;
}

// Update full game:
async function updateFullGame(game: GameModel): Promise<GameModel> {

    // Validate PUT: 
    const errors = game.validatePut();
    if (errors) {
        throw new ValidationError(errors);
    }

    const games = await dal.fetchGames(); // Won't be needed on real database.
    const gameToUpdate = games.find(g => g.id === game.id); // Find game to update.

    // If game not found: 
    if (!gameToUpdate) {
        throw new ResourceNotFound(game.id);
    }

    for (const prop in gameToUpdate) { // Update all fields
        gameToUpdate[prop] = game[prop];
    }
    await dal.saveGames(games); // Save back to file.
    return gameToUpdate; // Return.
}

// Update partial game:
async function updatePartialGame(game: GameModel): Promise<GameModel> {

    // Validate PATCH: 
    const errors = game.validatePatch();
    if (errors) {
        throw new ValidationError(errors);
    }

    const games = await dal.fetchGames(); // Won't be needed on real database.
    const gameToUpdate = games.find(g => g.id === game.id); // Find game to update.

    // If game not found: 
    if (!gameToUpdate) {
        throw new ResourceNotFound(game.id);
    }

    for (const prop in gameToUpdate) { // Update all fields
        if (game[prop] !== undefined) {
            gameToUpdate[prop] = game[prop];
        }
    }
    await dal.saveGames(games); // Save back to file.
    return gameToUpdate; // Return.
}

// Delete existing game:
async function deleteGame(id: number): Promise<void> {
    const games = await dal.fetchGames(); // Won't be needed on real database.
    const index = games.findIndex(g => g.id === id); // Find index to delete.

    // If game not found: 
    if (index === -1) {
        throw new ResourceNotFound(id);
    }

    games.splice(index, 1); // Delete it.
    await dal.saveGames(games); // Save back to file.
}

// Get games by min age: 
async function getGamesByMinAge(minAge: number): Promise<GameModel[]> {
    const games = await dal.fetchGames(); // Won't be needed on real database.
    const matchingGames = games.filter(g => g.minAge <= minAge);
    return matchingGames;
}


export default {
    getAllGames,
    getOneGame,
    addGame,
    updateFullGame,
    updatePartialGame,
    deleteGame,
    getGamesByMinAge
}

