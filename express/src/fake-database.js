const map = {};

export const find = (id) => map[id];

export const save = (hog) => map[hog.id] = hog;

export const del = (id) => delete map[id];