const raw = {};

function importAll(r) {
  r.keys().forEach((key) => {
    if (key[0] !== '.') {
      return
    }
    const newKey = key.split('.')[1].substr(1).toLowerCase()
    raw[newKey] = r(key).default
  })
}

importAll(require.context('../d2files', false, /\.txt$/))

console.log('keys222', Object.keys(raw))

/**
 * Everything here is pretty much taken from here: https://github.com/blizzhackers/d2data/blob/master/compile.js
 * I made small altercations for my needs, but just passing some cred back to the original author.
 */

const fieldEnd = /\t/g
const lineEnd = /[\n\r]+/g

const indexes = {
	armor: 'code',
	ArmType: 'Token',
	charstats: 'class',
	difficultylevels: 'Name',
	ElemTypes: 'Code',
	experience: 'Level',
	gems: 'code',
	inventory: 'class',
	ItemStatCost: 'Stat',
	ItemTypes: 'Code',
	Levels: 'Id',
	LvlMaze: 'Level',
	LvlPrest: 'Def',
	LvlTypes: 'Name',
	misc: 'code',
	Missiles: 'Id',
	MonMode: 'code',
	monstats: 'hcIdx',
	monstats2: 'Id',
	MonType: 'type',
	npc: 'npc',
	ObjMode: 'Token',
	Overlay: 'overlay',
	pettype: 'pet type',
	PlrMode: 'Code',
	PlrType: 'Token',
	PlayerClass: 'Code',
	Properties: 'code',
	Runes: 'Rune Name',
	SetItems: 'index',
	Sets: 'index',
	shrines: 'Code',
	skillcalc: 'code',
	skills: 'Id',
	SoundEnviron: 'Index',
	Sounds: 'Index',
	states: 'state',
	StorePage: 'Code',
	SuperUniques: 'hcIdx',
	TreasureClass: 'Treasure Class',
	TreasureClassEx: 'Treasure Class',
	weapons: 'code',
	WeaponClass: 'Code',
}

const filterValues = {
	'': true,
	'0': true,
	'unused': true,
	'none': true,
	'null': true,
}

const full = Object.keys(raw).reduce((full, fn) => {
  let data = raw[fn].toString().split(lineEnd)
	let header = data.shift().split(fieldEnd)
	let indexColumn = header.indexOf(indexes[fn])
	let expansion = false;
	let maxKeyCount = 0;

	if (indexColumn === -1) {
		console.log('Using default Index for:', fn);
	}

	full[fn] = data.reduce((obj, line, index) => {

		if (line.trim()) {
			if (line.toLowerCase().trim() === 'expansion') {
				expansion = true;
			} else if ((line = line.split(fieldEnd))) {
				let key = indexColumn >= 0 ? (line[indexColumn]) : index;

				if (key !== undefined) {
					if (key !== '') {
						if (obj[key]) {
							throw new Error('Duplicate key ' + JSON.stringify(key) + ' in ' + fn);
						} else {
							let tmp = expansion ? {expansion: 1} : {};

							for (let c = 0; c < header.length; c++) {
								if (indexColumn >= 0 && c === indexColumn || !filterValues[line[c].toString().toLowerCase()]) {
									tmp[header[c] || 'unknown'] = +line[c] == line[c] ? +line[c] : line[c];
								}
							}

							let keyCount = Object.keys(tmp).length;

							if (keyCount > 0) {
								obj[key] = tmp;
							}

							maxKeyCount = Math.max(maxKeyCount, keyCount);
						}
					}
				} else {
					throw new Error('No viable key in: ' + fn + ' : ' + key);
				}
			}
		}

		return obj
	}, {})

	if (maxKeyCount === 1) {
		full[fn] = Object.values(full[fn]).map(line => Object.values(line)[0]);
		console.log(fn, 'was reduced!')
	}

  return full
}, {})

/// Atomic stuff?
let atomic = {};
let calcTC = x => Math.min(87, Math.max(1, Math.ceil((x || 0) / 3)) * 3);

Object.values(full.weapons).forEach(item => {
	if (item.rarity) {
		let tc = calcTC(item.level), rarity = item.rarity;
		atomic['weap' + tc] = atomic['weap' + tc] || {};
		atomic['weap' + tc][item.code] = rarity;

		if (item.type === 'bow' || item.type === 'xbow') {
			atomic['bow' + tc] = atomic['bow' + tc] || {};
			atomic['bow' + tc][item.code] = rarity;
		} else {
			atomic['mele' + tc] = atomic['mele' + tc] || {};
			atomic['mele' + tc][item.code] = rarity;
		}
	}
});

Object.values(full.armor).forEach(item => {
	if (item.rarity) {
		let tc = calcTC(item.level);
		atomic['armo' + tc] = atomic['armo' + tc] || {};
		atomic['armo' + tc][item.code] = item.rarity || 0;
	}
});

full.atomic = atomic

export default full
