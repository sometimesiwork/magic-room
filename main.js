// Создаем сцену
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Создаем камеру
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

// Создаем рендерер
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Добавляем освещение
const ambientLight = new THREE.AmbientLight(0x808080, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

// Добавляем дополнительное освещение
const pointLight = new THREE.PointLight(0xffffff, 1, 10);
pointLight.position.set(0, 3, -4);
pointLight.castShadow = true;
scene.add(pointLight);

// Создаем пол
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x2c2c2c,
    roughness: 0.5,
    metalness: 0.1
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Создаем стены
const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x2a2a2a,
    roughness: 0.5,
    metalness: 0.1
});

// Задняя стена
const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 5),
    wallMaterial
);
backWall.position.z = -5;
backWall.position.y = 2.5;
backWall.receiveShadow = true;
scene.add(backWall);

// Боковые стены
const leftWall = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 5),
    wallMaterial
);
leftWall.position.x = -5;
leftWall.position.y = 2.5;
leftWall.rotation.y = Math.PI / 2;
leftWall.receiveShadow = true;
scene.add(leftWall);

const rightWall = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 5),
    wallMaterial
);
rightWall.position.x = 5;
rightWall.position.y = 2.5;
rightWall.rotation.y = -Math.PI / 2;
rightWall.receiveShadow = true;
scene.add(rightWall);

// Создаем магический алтарь
const altarGeometry = new THREE.BoxGeometry(1, 0.5, 1);
const altarMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x6a6a6a,
    roughness: 0.3,
    metalness: 0.3
});
const altar = new THREE.Mesh(altarGeometry, altarMaterial);
altar.position.set(0, 0.25, -4);
altar.castShadow = true;
altar.receiveShadow = true;
scene.add(altar);

// Создаем свечи
const candleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 8);
const candleMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    roughness: 0.3,
    metalness: 0.7
});

// Добавляем систему ритуальных предметов
const ritualItems = {
    candles: [],
    incense: null,
    altar: null,
    circle: null,
    crystals: [],
    herbs: [],
    pentacle: null,
    athame: null,
    chalice: null,
    wand: null
};

// Создаем благовония
const incenseGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 8);
const incenseMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x8B4513,
    roughness: 0.9,
    metalness: 0.1,
    emissive: 0x8B4513,
    emissiveIntensity: 0.1
});
const incense = new THREE.Mesh(incenseGeometry, incenseMaterial.clone());
incense.position.set(0, 0.75, -4); // Изменяем позицию на алтарь
incense.castShadow = true;
incense.receiveShadow = true;
incense.userData = {
    type: 'incense',
    isLit: false
};
scene.add(incense);
ritualItems.incense = incense;

// Обновляем создание свечей
const createCandle = (x, z) => {
    const candle = new THREE.Mesh(candleGeometry, candleMaterial.clone());
    candle.position.set(x, 0.75, z);
    candle.castShadow = true;
    candle.receiveShadow = true;
    candle.userData = {
        isLit: false,
        type: 'candle'
    };
    ritualItems.candles.push(candle);
    return candle;
};

// Добавляем свечи по кругу
const candlePositions = [
    { x: -1.5, z: -4 }, // Левая свеча
    { x: 1.5, z: -4 },  // Правая свеча
    { x: 0, z: -2.5 },  // Передняя свеча
    { x: -1.5, z: -1 }, // Задняя левая свеча
    { x: 1.5, z: -1 }   // Задняя правая свеча
];

candlePositions.forEach(pos => {
    scene.add(createCandle(pos.x, pos.z));
});

// Создаем магический круг на полу
const circleGeometry = new THREE.RingGeometry(1.5, 1.7, 32);
const circleMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x800080,
    roughness: 0.2,
    metalness: 0.8,
    emissive: 0x400040,
    emissiveIntensity: 1.0
});
const magicCircle = new THREE.Mesh(circleGeometry, circleMaterial);
magicCircle.rotation.x = -Math.PI / 2;
magicCircle.position.y = 0.01;
magicCircle.receiveShadow = true;
scene.add(magicCircle);

// Создаем кристаллы
const crystalGeometry = new THREE.OctahedronGeometry(0.2, 0);
const crystalMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    roughness: 0.2,
    metalness: 0.8,
    transparent: true,
    opacity: 0.8
});

// Обновляем создание кристаллов
const createCrystal = (x, z) => {
    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial.clone());
    crystal.position.set(x, 0.5, z);
    crystal.castShadow = true;
    crystal.receiveShadow = true;
    crystal.userData = {
        type: 'crystal',
        isCharged: false
    };
    ritualItems.crystals.push(crystal);
    return crystal;
};

// Добавляем кристаллы на алтарь
const crystalPositions = [
    { x: -0.3, z: -4 }, // Левый кристалл
    { x: 0.3, z: -4 },  // Правый кристалл
    { x: 0, z: -3.8 },  // Центральный кристалл
    { x: 0, z: -4.2 }   // Задний кристалл
];

crystalPositions.forEach(pos => {
    scene.add(createCrystal(pos.x, pos.z));
});

// Создаем травы
const herbGeometry = new THREE.ConeGeometry(0.1, 0.3, 8);
const herbMaterial = new THREE.MeshStandardMaterial({
    color: 0x228B22,
    roughness: 0.8,
    metalness: 0.2
});

// Обновляем создание трав
const createHerb = (x, z) => {
    const herb = new THREE.Mesh(herbGeometry, herbMaterial.clone());
    herb.position.set(x, 0.5, z);
    herb.castShadow = true;
    herb.receiveShadow = true;
    herb.userData = {
        type: 'herb',
        isBurning: false
    };
    ritualItems.herbs.push(herb);
    return herb;
};

// Добавляем травы на алтарь
const herbPositions = [
    { x: 0.3, z: -4 },  // Правая трава
    { x: -0.3, z: -4 }, // Левая трава
    { x: 0, z: -4.2 }   // Задняя трава
];

herbPositions.forEach(pos => {
    scene.add(createHerb(pos.x, pos.z));
});

// Создаем пентакль
const pentacleGeometry = new THREE.RingGeometry(0.3, 0.4, 5);
const pentacleMaterial = new THREE.MeshStandardMaterial({
    color: 0xCD853F,
    roughness: 0.3,
    metalness: 0.7
});
const pentacle = new THREE.Mesh(pentacleGeometry, pentacleMaterial.clone());
pentacle.position.set(0, 0.5, -4);
pentacle.castShadow = true;
pentacle.receiveShadow = true;
pentacle.userData = {
    type: 'pentacle',
    isCharged: false
};
ritualItems.pentacle = pentacle;
scene.add(pentacle);

// Создаем атам (ритуальный нож)
const athameGeometry = new THREE.BoxGeometry(0.1, 0.4, 0.1);
const athameMaterial = new THREE.MeshStandardMaterial({
    color: 0x808080,
    roughness: 0.2,
    metalness: 0.8
});
const athame = new THREE.Mesh(athameGeometry, athameMaterial.clone());
athame.position.set(-0.4, 0.5, -4);
athame.rotation.z = Math.PI / 4;
athame.castShadow = true;
athame.receiveShadow = true;
athame.userData = {
    type: 'athame',
    isCharged: false
};
ritualItems.athame = athame;
scene.add(athame);

// Создаем чашу
const chaliceGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.3, 8);
const chaliceMaterial = new THREE.MeshStandardMaterial({
    color: 0xC0C0C0,
    roughness: 0.3,
    metalness: 0.7
});
const chalice = new THREE.Mesh(chaliceGeometry, chaliceMaterial.clone());
chalice.position.set(0.4, 0.5, -4);
chalice.castShadow = true;
chalice.receiveShadow = true;
chalice.userData = {
    type: 'chalice',
    isFilled: false
};
ritualItems.chalice = chalice;
scene.add(chalice);

// Создаем волшебную палочку
const wandGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8);
const wandMaterial = new THREE.MeshStandardMaterial({
    color: 0x8B4513,
    roughness: 0.4,
    metalness: 0.6,
    emissive: 0x8B4513,
    emissiveIntensity: 0.1
});
const wand = new THREE.Mesh(wandGeometry, wandMaterial.clone());
wand.position.set(0, 0.5, -4.2);
wand.castShadow = true;
wand.receiveShadow = true;
wand.userData = {
    type: 'wand',
    isCharged: false
};
ritualItems.wand = wand;
scene.add(wand);

// Добавляем систему звуков
const audioSystem = {
    sounds: {},
    init() {
        this.sounds = {
            ambient: new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'),
            ritual: new Audio('https://assets.mixkit.co/active_storage/sfx/2014/2014-preview.mp3'),
            candle: new Audio('https://assets.mixkit.co/active_storage/sfx/2015/2015-preview.mp3'),
            crystal: new Audio('https://assets.mixkit.co/active_storage/sfx/2016/2016-preview.mp3'),
            portal: new Audio('https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3')
        };
        
        // Настраиваем фоновый звук
        this.sounds.ambient.loop = true;
        this.sounds.ambient.volume = 0.3;
    },
    
    play(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play();
        }
    }
};

// Добавляем систему частиц для свечей
const candleParticleSystem = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
        size: 0.05,
        color: 0xff6600,
        transparent: true,
        opacity: 0.6
    })
);
scene.add(candleParticleSystem);

// Создаем систему ритуалов
const rituals = {
    protection: {
        name: "Защитный круг",
        description: "Создание защитного барьера вокруг себя",
        color: 0x00ff00,
        duration: 8000,
        particles: 200,
        effect: "shield",
        requirements: ["candles", "circle", "pentacle", "athame"],
        steps: [
            {
                text: "Подойдите к магическому кругу",
                action: () => {
                    const distance = camera.position.distanceTo(magicCircle.position);
                    const horizontalDistance = Math.sqrt(
                        Math.pow(camera.position.x - magicCircle.position.x, 2) +
                        Math.pow(camera.position.z - magicCircle.position.z, 2)
                    );
                    
                    if (distance > 3) {
                        ritualSystem.showInstruction('Подойдите ближе к магическому кругу');
                        return false;
                    }
                    
                    if (distance < 0.5) {
                        ritualSystem.showInstruction('Отойдите немного от магического круга');
                        return false;
                    }
                    
                    if (horizontalDistance > 1.5) {
                        ritualSystem.showInstruction('Встаньте в центр магического круга');
                        return false;
                    }
                    
                    ritualSystem.showInstruction('Вы в правильной позиции. Нажмите ЛКМ для продолжения');
                    return true;
                }
            },
            {
                text: "Зажгите свечи по часовой стрелке",
                action: () => {
                    const allLit = ritualItems.candles.every(candle => candle.userData.isLit);
                    if (!allLit) {
                        ritualSystem.showInstruction('Зажгите все свечи по часовой стрелке');
                        return false;
                    }
                    ritualSystem.showInstruction('Все свечи зажжены. Нажмите ЛКМ для продолжения');
                    return true;
                }
            },
            {
                text: "Зарядите пентакль энергией",
                action: () => {
                    if (!ritualItems.pentacle.userData.isCharged) {
                        ritualSystem.showInstruction('Наведите на пентакль и нажмите ЛКМ для зарядки');
                        return false;
                    }
                    ritualSystem.showInstruction('Пентакль заряжен. Нажмите ЛКМ для продолжения');
                    return true;
                }
            },
            {
                text: "Начертите защитный круг атамом",
                action: () => {
                    if (!ritualItems.athame.userData.isCharged) {
                        ritualSystem.showInstruction('Наведите на атам и нажмите ЛКМ для зарядки');
                        return false;
                    }
                    ritualSystem.showInstruction('Атам заряжен. Нажмите ЛКМ для продолжения');
                    return true;
                }
            },
            {
                text: "Начните ритуал",
                action: () => {
                    ritualSystem.showInstruction('Все готово. Нажмите ЛКМ для начала ритуала');
                    return true;
                }
            }
        ],
        sound: "ritual",
        particleEffect: "shield",
        visualEffect: "shield"
    },
    cleansing: {
        name: "Очищение пространства",
        description: "Очищение помещения от негативной энергии",
        color: 0x00ffff,
        duration: 10000,
        particles: 300,
        effect: "wave",
        requirements: ["candles", "circle", "incense", "herbs", "wand"],
        steps: [
            {
                text: "Подойдите к магическому кругу",
                action: () => ritualSystem.checkDistanceToCircle()
            },
            {
                text: "Зажгите свечи по часовой стрелке",
                action: () => ritualSystem.checkCandles()
            },
            {
                text: "Зажгите благовония",
                action: () => ritualSystem.checkItem('incense'),
                requiresDeactivation: true
            },
            {
                text: "Подожгите травы",
                action: () => ritualSystem.checkItem('herb')
            },
            {
                text: "Используйте волшебную палочку для очищения",
                action: () => ritualSystem.checkItem('wand')
            },
            {
                text: "Начните ритуал",
                action: () => true
            },
            {
                text: "Зажгите свечи по часовой стрелке повторно",
                action: () => ritualSystem.checkCandles()
            }
        ],
        sound: "ritual",
        particleEffect: "wave",
        visualEffect: "wave"
    },
    summoning: {
        name: "Призыв духов",
        description: "Создание портала для связи с духовным миром",
        color: 0xff0000,
        duration: 15000,
        particles: 500,
        effect: "portal",
        requirements: ["candles", "circle", "altar", "crystals", "chalice"],
        steps: [
            {
                text: "Подойдите к магическому кругу",
                action: () => ritualSystem.checkDistanceToCircle()
            },
            {
                text: "Зажгите свечи по часовой стрелке",
                action: () => ritualSystem.checkCandles()
            },
            {
                text: "Подготовьте алтарь",
                action: () => ritualSystem.checkItem('altar')
            },
            {
                text: "Зарядите кристаллы энергией",
                action: () => ritualSystem.checkItem('crystal')
            },
            {
                text: "Наполните чашу водой",
                action: () => ritualSystem.checkItem('chalice')
            },
            {
                text: "Начните ритуал",
                action: () => true
            }
        ],
        sound: "portal",
        particleEffect: "portal",
        visualEffect: "portal"
    },
    healing: {
        name: "Целительство",
        description: "Создание поля исцеляющей энергии",
        color: 0x00ffff,
        duration: 12000,
        particles: 400,
        effect: "heal",
        requirements: ["candles", "circle", "altar", "crystals", "herbs", "wand"],
        steps: [
            {
                text: "Подойдите к магическому кругу",
                action: () => ritualSystem.checkDistanceToCircle()
            },
            {
                text: "Зажгите свечи по часовой стрелке",
                action: () => ritualSystem.checkCandles()
            },
            {
                text: "Подготовьте алтарь",
                action: () => ritualSystem.checkItem('altar')
            },
            {
                text: "Зарядите кристаллы энергией",
                action: () => ritualSystem.checkItem('crystal')
            },
            {
                text: "Подожгите целебные травы",
                action: () => ritualSystem.checkItem('herb')
            },
            {
                text: "Используйте волшебную палочку для исцеления",
                action: () => ritualSystem.checkItem('wand')
            },
            {
                text: "Начните ритуал",
                action: () => true
            }
        ],
        sound: "ritual",
        particleEffect: "heal",
        visualEffect: "heal"
    },
    divination: {
        name: "Прорицание",
        description: "Открытие видений будущего",
        color: 0x800080,
        duration: 10000,
        particles: 250,
        effect: "vision",
        requirements: ["candles", "circle", "altar", "crystals", "chalice", "pentacle"],
        steps: [
            {
                text: "Подойдите к магическому кругу",
                action: () => ritualSystem.checkDistanceToCircle()
            },
            {
                text: "Зажгите свечи по часовой стрелке",
                action: () => ritualSystem.checkCandles()
            },
            {
                text: "Подготовьте алтарь",
                action: () => ritualSystem.checkItem('altar')
            },
            {
                text: "Зарядите кристаллы энергией",
                action: () => ritualSystem.checkItem('crystal')
            },
            {
                text: "Наполните чашу водой",
                action: () => ritualSystem.checkItem('chalice')
            },
            {
                text: "Зарядите пентакль энергией",
                action: () => ritualSystem.checkItem('pentacle')
            },
            {
                text: "Начните ритуал",
                action: () => true
            }
        ],
        sound: "ritual",
        particleEffect: "vision",
        visualEffect: "vision"
    },
    regardie: {
        name: "Полный ритуал Регарди",
        description: "Церемониальный ритуал из книги Израэля Регарди",
        color: 0x800080,
        duration: 30000,
        particles: 1000,
        effect: "portal",
        requirements: ["candles", "circle", "altar", "crystals", "chalice", "pentacle", "athame", "wand", "incense", "herbs"],
        steps: [
            {
                text: "Встаньте в центр магического круга и произнесите: HEKAS, HEKAS, ESTE BEBELOI",
                action: () => {
                    const distance = camera.position.distanceTo(magicCircle.position);
                    const horizontalDistance = Math.sqrt(
                        Math.pow(camera.position.x - magicCircle.position.x, 2) +
                        Math.pow(camera.position.z - magicCircle.position.z, 2)
                    );
                    
                    if (distance > 3) {
                        ritualSystem.showInstruction('Подойдите ближе к магическому кругу');
                        return false;
                    }
                    
                    if (distance < 0.5) {
                        ritualSystem.showInstruction('Отойдите немного от магического круга');
                        return false;
                    }
                    
                    if (horizontalDistance > 1.5) {
                        ritualSystem.showInstruction('Встаньте в центр магического круга');
                        return false;
                    }
                    
                    ritualSystem.showInstruction('Произнесите: HEKAS, HEKAS, ESTE BEBELOI');
                    return true;
                }
            },
            {
                text: "Совершите Ритуал изгоняющей пентаграммы",
                action: () => {
                    if (!ritualItems.pentacle.userData.isCharged) {
                        ritualSystem.showInstruction('Зарядите пентакль для ритуала изгоняющей пентаграммы');
                        return false;
                    }
                    return true;
                }
            },
            {
                text: "Совершите Ритуал изгоняющей гексаграммы",
                action: () => {
                    if (!ritualItems.wand.userData.isCharged) {
                        ritualSystem.showInstruction('Зарядите волшебную палочку для ритуала изгоняющей гексаграммы');
                        return false;
                    }
                    return true;
                }
            },
            {
                text: "Подойдите к южной стороне алтаря и возьмите символ Огня",
                action: () => {
                    const allLit = ritualItems.candles.every(candle => candle.userData.isLit);
                    if (!allLit) {
                        ritualSystem.showInstruction('Зажгите все свечи для символа Огня');
                        return false;
                    }
                    return true;
                }
            },
            {
                text: "Обойдите храм по периметру по часовой стрелке с символом Огня",
                action: () => {
                    // Проверяем, зажжены ли все свечи (символ Огня)
                    const allLit = ritualItems.candles.every(candle => candle.userData.isLit);
                    if (!allLit) {
                        ritualSystem.showInstruction('Сначала зажгите все свечи для символа Огня');
                        return false;
                    }

                    // Проверяем расстояние до центра круга
                    const distance = Math.sqrt(
                        Math.pow(camera.position.x - magicCircle.position.x, 2) +
                        Math.pow(camera.position.z - magicCircle.position.z, 2)
                    );
                    
                    if (distance > 2) { // Увеличиваем радиус допустимой зоны
                        ritualSystem.showInstruction('Вернитесь в пределы магического круга');
                        return false;
                    }

                    // Проверяем прогресс обхода
                    if (ritualSystem.checkCircleProgress()) {
                        ritualSystem.showInstruction('Обход храма с символом Огня завершен');
                        return true;
                    }

                    // Показываем текущий прогресс
                    const progressPercent = Math.min(100, (ritualSystem.circleProgress / (2 * Math.PI)) * 100);
                    ritualSystem.showInstruction(`Обойдите храм по часовой стрелке. Прогресс: ${Math.round(progressPercent)}%`);
                    return false;
                }
            },
            {
                text: "Наполните чашу водой",
                action: () => {
                    if (!ritualItems.chalice.userData.isFilled) {
                        ritualSystem.showInstruction('Наполните чашу водой');
                        return false;
                    }
                    return true;
                }
            },
            {
                text: "Опустошите чашу для следующего ритуального действия",
                requiresDeactivation: true,
                action: () => {
                    if (ritualItems.chalice.userData.isFilled) {
                        ritualSystem.showInstruction('Опустошите чашу (нажмите ЛКМ)');
                        return false;
                    }
                    return true;
                }
            },
            {
                text: "Возьмите символ Воздуха и обойдите храм",
                action: () => {
                    // Проверяем, зажжены ли благовония (символ Воздуха)
                    if (!ritualItems.incense || !ritualItems.incense.userData.isLit) {
                        ritualSystem.showInstruction('Зажгите благовония для символа Воздуха');
                        return false;
                    }

                    // Проверяем расстояние до центра круга
                    const distance = Math.sqrt(
                        Math.pow(camera.position.x - magicCircle.position.x, 2) +
                        Math.pow(camera.position.z - magicCircle.position.z, 2)
                    );
                    
                    if (distance > 2) {
                        ritualSystem.showInstruction('Вернитесь в пределы магического круга');
                        return false;
                    }

                    // Проверяем прогресс обхода
                    if (ritualSystem.checkCircleProgress()) {
                        ritualSystem.showInstruction('Обход храма с символом Воздуха завершен');
                        return true;
                    }

                    return false;
                }
            },
            {
                text: "Возьмите символ Земли и обойдите храм",
                action: () => {
                    const allCharged = ritualItems.crystals.every(crystal => crystal.userData.isCharged);
                    if (!allCharged) {
                        ritualSystem.showInstruction('Зарядите кристаллы для символа Земли');
                        return false;
                    }
                    return true;
                }
            },
            {
                text: "Совершите знак Врат над алтарем",
                action: () => {
                    if (!ritualItems.athame.userData.isCharged) {
                        ritualSystem.showInstruction('Зарядите атам для знака Врат');
                        return false;
                    }
                    return true;
                }
            },
            {
                text: "Трижды обойдите храм по часовой стрелке",
                action: () => {
                    // Проверяем расстояние до центра круга
                    const distance = Math.sqrt(
                        Math.pow(camera.position.x - magicCircle.position.x, 2) +
                        Math.pow(camera.position.z - magicCircle.position.z, 2)
                    );

                    if (distance > 2) {
                        ritualSystem.showInstruction('Вернитесь в пределы магического круга');
                        return false;
                    }

                    // Инициализируем отслеживание обхода, если это первый шаг или начало нового круга
                    if (!ritualSystem.lastPosition) {
                        ritualSystem.lastPosition = new THREE.Vector3(camera.position.x, 0, camera.position.z);
                        ritualSystem.startAngle = Math.atan2(
                            camera.position.z - magicCircle.position.z,
                            camera.position.x - magicCircle.position.x
                        );
                        ritualSystem.lastAngle = ritualSystem.startAngle;
                        ritualSystem.circleProgress = 0;
                        ritualSystem.circleCount = 0;
                        return false;
                    }

                    // Вычисляем текущий угол
                    const currentAngle = Math.atan2(
                        camera.position.z - magicCircle.position.z,
                        camera.position.x - magicCircle.position.x
                    );

                    // Вычисляем разницу углов
                    let angleDiff = currentAngle - ritualSystem.lastAngle;

                    // Корректируем разницу углов для правильного определения направления
                    if (angleDiff > Math.PI) {
                        angleDiff -= 2 * Math.PI;
                    } else if (angleDiff < -Math.PI) {
                        angleDiff += 2 * Math.PI;
                    }

                    // Проверяем направление движения
                    if (angleDiff > 0) {
                        // Движение по часовой стрелке
                        ritualSystem.circleProgress += angleDiff;

                        // Показываем прогресс
                        const progressPercent = Math.min(100, (ritualSystem.circleProgress / (2 * Math.PI)) * 100);
                        ritualSystem.showInstruction(`Круг ${ritualSystem.circleCount + 1} из 3. Прогресс: ${Math.round(progressPercent)}%`);

                        // Если круг завершен
                        if (ritualSystem.circleProgress >= 2 * Math.PI) {
                            ritualSystem.circleCount++;
                            ritualSystem.circleProgress -= 2 * Math.PI; // Сбрасываем прогресс для следующего круга

                            if (ritualSystem.circleCount < 3) {
                                ritualSystem.showInstruction(`Завершен круг ${ritualSystem.circleCount} из 3. Продолжайте обход по часовой стрелке`);
                                return false;
                            } else {
                                ritualSystem.showInstruction('Все три круга завершены');
                                ritualSystem.circleCount = 0;
                                return true;
                            }
                        }
                    } else {
                        // Движение против часовой стрелки
                        ritualSystem.showInstruction('Двигайтесь по часовой стрелке');
                    }

                    ritualSystem.lastAngle = currentAngle;
                    ritualSystem.lastPosition.set(camera.position.x, 0, camera.position.z);
                    return false;
                }
            },
            {
                text: "Наполните чашу водой для второго ритуального действия",
                action: () => {
                    if (!ritualItems.chalice.userData.isFilled) {
                        ritualSystem.showInstruction('Наполните чашу водой');
                        return false;
                    }
                    return true;
                }
            },
            {
                text: "Опустошите чашу после завершения ритуального действия",
                requiresDeactivation: true,
                action: () => {
                    if (ritualItems.chalice.userData.isFilled) {
                        ritualSystem.showInstruction('Опустошите чашу (нажмите ЛКМ)');
                        return false;
                    }
                    return true;
                }
            },
            {
                text: "Возьмите символ Воздуха и обойдите храм",
                action: () => {
                    // Проверяем, зажжены ли благовония (символ Воздуха)
                    if (!ritualItems.incense || !ritualItems.incense.userData.isLit) {
                        ritualSystem.showInstruction('Зажгите благовония для символа Воздуха');
                        return false;
                    }

                    // Проверяем расстояние до центра круга
                    const distance = Math.sqrt(
                        Math.pow(camera.position.x - magicCircle.position.x, 2) +
                        Math.pow(camera.position.z - magicCircle.position.z, 2)
                    );
                    
                    if (distance > 2) {
                        ritualSystem.showInstruction('Вернитесь в пределы магического круга');
                        return false;
                    }

                    // Проверяем прогресс обхода
                    if (ritualSystem.checkCircleProgress()) {
                        ritualSystem.showInstruction('Обход храма с символом Воздуха завершен');
                        return true;
                    }

                    return false;
                }
            },
            {
                text: "Возьмите символ Земли и обойдите храм",
                action: () => {
                    const allCharged = ritualItems.crystals.every(crystal => crystal.userData.isCharged);
                    if (!allCharged) {
                        ritualSystem.showInstruction('Зарядите кристаллы для символа Земли');
                        return false;
                    }
                    return true;
                }
            },
            {
                text: "Совершите знак Врат над алтарем",
                action: () => {
                    if (!ritualItems.athame.userData.isCharged) {
                        ritualSystem.showInstruction('Зарядите атам для знака Врат');
                        return false;
                    }
                    return true;
                }
            },
            {
                text: "Трижды обойдите храм по часовой стрелке",
                action: () => {
                    // Проверяем расстояние до центра круга
                    const distance = Math.sqrt(
                        Math.pow(camera.position.x - magicCircle.position.x, 2) +
                        Math.pow(camera.position.z - magicCircle.position.z, 2)
                    );
                    
                    if (distance > 2) {
                        ritualSystem.showInstruction('Вернитесь в пределы магического круга');
                        return false;
                    }

                    // Инициализируем отслеживание обхода, если это первый шаг или начало нового круга
                    if (!ritualSystem.lastPosition || ritualSystem.circleProgress >= 2 * Math.PI) {
                        ritualSystem.lastPosition = new THREE.Vector3(camera.position.x, 0, camera.position.z);
                        ritualSystem.circleProgress = 0;
                        ritualSystem.startAngle = Math.atan2(
                            camera.position.z - magicCircle.position.z,
                            camera.position.x - magicCircle.position.x
                        );
                        ritualSystem.lastAngle = ritualSystem.startAngle;
                        if (!ritualSystem.lastPosition) {
                            ritualSystem.circleCount = 0;
                        }
                        return false;
                    }

                    // Вычисляем текущий угол
                    const currentAngle = Math.atan2(
                        camera.position.z - magicCircle.position.z,
                        camera.position.x - magicCircle.position.x
                    );

                    // Вычисляем разницу углов
                    let angleDiff = currentAngle - ritualSystem.lastAngle;

                    // Корректируем разницу углов для правильного определения направления
                    if (angleDiff > Math.PI) {
                        angleDiff -= 2 * Math.PI;
                    } else if (angleDiff < -Math.PI) {
                        angleDiff += 2 * Math.PI;
                    }

                    // Проверяем направление движения
                    if (angleDiff > 0) {
                        // Движение по часовой стрелке
                        ritualSystem.circleProgress += angleDiff;
                        
                        // Показываем прогресс
                        const progressPercent = Math.min(100, (ritualSystem.circleProgress / (2 * Math.PI)) * 100);
                        ritualSystem.showInstruction(`Круг ${ritualSystem.circleCount + 1} из 3. Прогресс: ${Math.round(progressPercent)}%`);
                        
                        // Если круг завершен
                        if (ritualSystem.circleProgress >= 2 * Math.PI) {
                            ritualSystem.circleCount++;
                            
                            if (ritualSystem.circleCount < 3) {
                                ritualSystem.showInstruction(`Завершен круг ${ritualSystem.circleCount} из 3. Продолжайте обход по часовой стрелке`);
                                return false;
                            } else {
                                ritualSystem.showInstruction('Все три круга завершены');
                                ritualSystem.circleCount = 0;
                                return true;
                            }
                        }
                    } else {
                        // Движение против часовой стрелки
                        ritualSystem.showInstruction('Двигайтесь по часовой стрелке');
                    }

                    ritualSystem.lastAngle = currentAngle;
                    ritualSystem.lastPosition.set(camera.position.x, 0, camera.position.z);
                    return false;
                }
            },
            {
                text: "Начните ритуал",
                action: () => true
            }
        ],
        sound: "ritual",
        particleEffect: "portal",
        visualEffect: "portal"
    }
};

// Создаем систему частиц для эффектов
const particleSystem = new THREE.Points(
    new THREE.BufferGeometry(),
    new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    })
);
scene.add(particleSystem);

// Функция для создания частиц с учетом типа эффекта
function createParticles(color, count, effect) {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
        switch(effect) {
            case "shield":
                // Создаем сферический щит
                const radius = 2;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.random() * Math.PI;
                positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
                positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                positions[i * 3 + 2] = radius * Math.cos(phi);
                break;
                
            case "wave":
                // Создаем волну частиц
                positions[i * 3] = (Math.random() - 0.5) * 8;
                positions[i * 3 + 1] = Math.random() * 2;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
                break;
                
            case "portal":
                // Создаем спиральный портал
                const angle = Math.random() * Math.PI * 2;
                const height = Math.random() * 3;
                positions[i * 3] = Math.cos(angle) * (1 + height * 0.5);
                positions[i * 3 + 1] = height;
                positions[i * 3 + 2] = Math.sin(angle) * (1 + height * 0.5);
                break;
                
            case "heal":
                // Создаем восходящие частицы
                positions[i * 3] = (Math.random() - 0.5) * 4;
                positions[i * 3 + 1] = Math.random() * 3;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
                break;
                
            case "vision":
                // Создаем хаотичные частицы
                positions[i * 3] = (Math.random() - 0.5) * 6;
                positions[i * 3 + 1] = Math.random() * 4;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
                break;
        }
        
        // Добавляем случайную скорость для каждой частицы
        velocities[i * 3] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        
        colors[i * 3] = ((color >> 16) & 0xff) / 255;
        colors[i * 3 + 1] = ((color >> 8) & 0xff) / 255;
        colors[i * 3 + 2] = (color & 0xff) / 255;
    }
    
    particleSystem.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleSystem.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleSystem.geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
}

// Создаем систему проведения ритуала
const ritualSystem = {
    currentRitual: null,
    currentStep: 0,
    steps: [],
    isActive: false,
    particleSystems: [],
    circleProgress: 0,
    lastPosition: null,
    circleCenter: new THREE.Vector3(0, 0, 0),
    circleRadius: 1.5,
    usedItems: [], // Отслеживание предметов, использованных В ТЕКУЩЕМ шаге (очищается в showNextStep)
    activatedItemsStep: {}, // Отслеживание шага активации для каждого предмета { itemUUID: stepIndex }

    initRitual(ritualType) {
        if (!rituals[ritualType]) {
            console.error('Ритуал не найден:', ritualType);
            return;
        }

        this.usedItems = []; // Очищаем список использованных предметов
        this.currentRitual = rituals[ritualType];
        this.currentStep = 0;
        this.isActive = true;
        this.steps = this.currentRitual.steps;
        this.activatedItemsStep = {}; // Сбрасываем отслеживание активации при начале нового ритуала

        this.createRitualUI();
        this.showNextStep();
        audioSystem.play(this.currentRitual.sound);
    },

    cancelRitual() {
        this.isActive = false;
        this.currentRitual = null;
        this.currentStep = 0;
        this.steps = [];
        
        // Удаляем панель ритуала
        const ritualPanel = document.querySelector('.ritual-panel');
        if (ritualPanel) {
            ritualPanel.remove();
        }
        
        const instructionDiv = document.querySelector('.interaction-hint');
        if (instructionDiv) {
            instructionDiv.remove();
        }
        
        // Показываем панель выбора ритуала
        const ritualSelection = document.getElementById('ritual-selection');
        if (ritualSelection) {
            ritualSelection.style.display = 'block';
        }
        
        // Сбрасываем все предметы
        ritualItems.candles.forEach(candle => {
            if (candle && candle.userData && candle.userData.isLit) {
                candle.userData.isLit = false;
                if (candle.userData.light) {
                    scene.remove(candle.userData.light);
                    candle.userData.light = null;
                }
                if (candle.userData.flame) {
                    scene.remove(candle.userData.flame);
                    candle.userData.flame = null;
                }
            }
        });
        
        ritualItems.crystals.forEach(crystal => {
            if (crystal && crystal.userData) {
                crystal.userData.isCharged = false;
                if (crystal.material) {
                    crystal.material.emissiveIntensity = 0;
                }
            }
        });
        
        ritualItems.herbs.forEach(herb => {
            if (herb && herb.userData) {
                herb.userData.isBurning = false;
                if (herb.material) {
                    herb.material.emissiveIntensity = 0;
                }
                if (herb.userData.smoke) {
                    scene.remove(herb.userData.smoke);
                    herb.userData.smoke = null;
                }
            }
        });
        
        if (ritualItems.pentacle && ritualItems.pentacle.userData) {
            ritualItems.pentacle.userData.isCharged = false;
            if (ritualItems.pentacle.material) {
                ritualItems.pentacle.material.emissiveIntensity = 0;
            }
        }
        
        if (ritualItems.athame && ritualItems.athame.userData) {
            ritualItems.athame.userData.isCharged = false;
            if (ritualItems.athame.material) {
                ritualItems.athame.material.emissiveIntensity = 0;
            }
        }
        
        if (ritualItems.wand && ritualItems.wand.userData) {
            ritualItems.wand.userData.isCharged = false;
            if (ritualItems.wand.material) {
                ritualItems.wand.material.emissiveIntensity = 0;
            }
        }
        
        if (ritualItems.chalice && ritualItems.chalice.userData) {
            ritualItems.chalice.userData.isFilled = false;
            if (ritualItems.chalice.material) {
                ritualItems.chalice.material.emissiveIntensity = 0;
            }
            // Удаляем воду из чаши
            if (ritualItems.chalice.userData.water) {
                scene.remove(ritualItems.chalice.userData.water);
                ritualItems.chalice.userData.water = null;
            }
        }
        
        if (ritualItems.incense && ritualItems.incense.userData) {
            ritualItems.incense.userData.isLit = false;
            if (ritualItems.incense.userData.smoke) {
                scene.remove(ritualItems.incense.userData.smoke);
                ritualItems.incense.userData.smoke = null;
            }
        }
    },

    showNextStep() {
        // Очищаем массив использованных предметов перед каждым шагом
        this.usedItems = [];

        if (this.currentStep < this.steps.length) {
            const step = this.steps[this.currentStep];

            // Показываем основную инструкцию
            this.showInstruction(step.text);
            
            // Обновляем подсветку текущего шага в панели
            const stepElements = document.querySelectorAll('.ritual-step');
            stepElements.forEach((el, index) => {
                if (index === this.currentStep) {
                    el.classList.add('active-step');
                } else {
                    el.classList.remove('active-step');
                }
            });
            
            // Показываем дополнительную инструкцию в зависимости от типа шага
            if (step.text.includes('Обойдите храм по часовой стрелке')) {
                this.showInstruction('Двигайтесь по часовой стрелке вокруг храма');
                // Сбрасываем счетчики для нового обхода
                this.circleCount = 0;
                this.circleProgress = 0;
                this.lastPosition = null;
                this.startAngle = null;
                this.lastAngle = null;
            } else if (step.text.includes('Зажгите свечи')) {
                this.showInstruction('Наведите на свечу и нажмите ЛКМ, чтобы зажечь');
            } else if (step.text.includes('Зарядите')) {
                this.showInstruction('Наведите на предмет и нажмите ЛКМ, чтобы зарядить');
            } else if (step.text.includes('Наполните чашу')) {
                this.showInstruction('Наведите на чашу и нажмите ЛКМ, чтобы наполнить водой');
            } else if (step.text.includes('Зажгите благовония')) {
                this.showInstruction('Наведите на благовония и нажмите ЛКМ, чтобы зажечь');
            } else if (step.text.includes('Подожгите травы')) {
                this.showInstruction('Наведите на травы и нажмите ЛКМ, чтобы поджечь');
            }
        } else {
            this.performRitual(this.currentRitual);
        }
    },
    
    showInstruction(text) {
        const instructionDiv = document.createElement('div');
        instructionDiv.className = 'interaction-hint magic-ui';
        instructionDiv.innerHTML = `
            <div>${text}</div>
            <div style="margin-top: 10px; font-size: 0.9em; color: #b0b0b0;">
                Нажмите ЛКМ для проверки
            </div>
        `;
        document.body.appendChild(instructionDiv);
    },
    
    nextStep() {
        if (this.currentStep < this.steps.length) {
            const step = this.steps[this.currentStep];
            
            // Проверяем условие шага
            if (step.action()) {
                // Если шаг выполнен успешно
                this.currentStep++;
                
                // Обновляем отображение шагов в панели
                const stepsContainer = document.querySelector('.ritual-steps');
                stepsContainer.innerHTML = this.steps.map((step, index) => `
                    <div class="ritual-step ${index === this.currentStep ? 'active-step' : ''} ${index < this.currentStep ? 'completed' : ''}">
                        <div class="step-number">Шаг ${index + 1} из ${this.steps.length}</div>
                        <div class="step-text">${step.text}</div>
                    </div>
                `).join('');
                
                // Показываем следующий шаг
                this.showNextStep();
            }
        } else {
            // Если все шаги выполнены
            this.completeRitual();
        }
    },
    
    checkDistanceToCircle() {
        const distance = camera.position.distanceTo(magicCircle.position);
        const maxDistance = 3; // Увеличиваем максимальное расстояние
        const minDistance = 0.5;
        
        if (distance > maxDistance) {
            this.showInstruction('Подойдите ближе к магическому кругу');
            return false;
        }
        
        if (distance < minDistance) {
            this.showInstruction('Отойдите немного от магического круга');
            return false;
        }
        
        // Проверяем, находится ли игрок над кругом
        const heightDiff = Math.abs(camera.position.y - magicCircle.position.y);
        if (heightDiff > 1.5) { // Увеличиваем допустимую разницу по высоте
            this.showInstruction('Встаньте на уровень магического круга');
            return false;
        }
        
        // Проверяем, находится ли игрок в пределах круга по горизонтали
        const horizontalDistance = Math.sqrt(
            Math.pow(camera.position.x - magicCircle.position.x, 2) +
            Math.pow(camera.position.z - magicCircle.position.z, 2)
        );
        
        if (horizontalDistance > 1.5) { // Радиус круга
            this.showInstruction('Встаньте в центр магического круга');
            return false;
        }
        
        return true;
    },
    
    checkCandles() {
        const allLitAndNotUsed = ritualItems.candles.every(candle =>
            candle && candle.userData && candle.userData.isLit && !this.usedItems.includes(candle)
        );

        if (!allLitAndNotUsed) {
            this.showInstruction('Зажгите все свечи по часовой стрелке');
            return false;
        }

        this.showInstruction('Все свечи зажжены. Нажмите ЛКМ для продолжения');
        return true;
    },
    
    checkItem(itemType) {
        let validItem = null;
        let currentStep = this.steps[this.currentStep];
        let stepRequiresDeactivation = currentStep && currentStep.requiresDeactivation;

        switch (itemType) {
            case 'crystal':
                validItem = ritualItems.crystals.find(crystal =>
                    crystal && crystal.userData &&
                    ((stepRequiresDeactivation && !crystal.userData.isCharged) ||
                    (!stepRequiresDeactivation && crystal.userData.isCharged && !this.usedItems.includes(crystal))));
                break;
            case 'herb':
                validItem = ritualItems.herbs.find(herb =>
                    herb && herb.userData &&
                    ((stepRequiresDeactivation && !herb.userData.isBurning) ||
                    (!stepRequiresDeactivation && herb.userData.isBurning && !this.usedItems.includes(herb))));
                break;
            case 'pentacle':
                validItem = ritualItems.pentacle &&
                    ritualItems.pentacle.userData &&
                    ((stepRequiresDeactivation && !ritualItems.pentacle.userData.isCharged) ||
                    (!stepRequiresDeactivation && ritualItems.pentacle.userData.isCharged && !this.usedItems.includes(ritualItems.pentacle)));
                break;
            case 'athame':
                validItem = ritualItems.athame &&
                    ritualItems.athame.userData &&
                    ((stepRequiresDeactivation && !ritualItems.athame.userData.isCharged) ||
                    (!stepRequiresDeactivation && ritualItems.athame.userData.isCharged && !this.usedItems.includes(ritualItems.athame)));
                break;
            case 'chalice':
                validItem = ritualItems.chalice &&
                    ritualItems.chalice.userData &&
                    ((stepRequiresDeactivation && !ritualItems.chalice.userData.isFilled) ||
                    (!stepRequiresDeactivation && ritualItems.chalice.userData.isFilled && !this.usedItems.includes(ritualItems.chalice)));
                break;
            case 'wand':
                validItem = ritualItems.wand &&
                    ritualItems.wand.userData &&
                    ((stepRequiresDeactivation && !ritualItems.wand.userData.isCharged) ||
                    (!stepRequiresDeactivation && ritualItems.wand.userData.isCharged && !this.usedItems.includes(ritualItems.wand)));
                break;
            case 'incense':
                validItem = ritualItems.incense &&
                    ritualItems.incense.userData &&
                    ((stepRequiresDeactivation && !ritualItems.incense.userData.isLit) ||
                    (!stepRequiresDeactivation && ritualItems.incense.userData.isLit && !this.usedItems.includes(ritualItems.incense)));
                break;
            case 'altar':
                validItem = true;
                break;
            case 'candle':
                if (stepRequiresDeactivation) {
                    validItem = ritualItems.candles.every(candle =>
                        candle && candle.userData && !candle.userData.isLit);
                    if (validItem) {
                        this.showInstruction('Все свечи погашены. Нажмите ЛКМ для продолжения');
                    }
                } else {
                    validItem = ritualItems.candles.every(candle =>
                        candle && candle.userData && candle.userData.isLit);
                    if (validItem) {
                        this.showInstruction('Все свечи зажжены. Нажмите ЛКМ для продолжения');
                    }
                }
                break;
            default:
                validItem = false;
        }

        if (validItem) {
            if (stepRequiresDeactivation) {
                // Для шага деактивации не добавляем в использованные предметы
                return true;
            }
            
            // Для обычного шага добавляем в использованные предметы
            if (itemType === 'crystal' || itemType === 'herb' || itemType === 'candle') {
                if (!stepRequiresDeactivation) {
                    this.usedItems.push(validItem);
                }
            } else if (itemType !== 'altar') {
                if (!stepRequiresDeactivation) {
                    this.usedItems.push(ritualItems[itemType]);
                }
            }
            return true;
        }
    
        return false;
    },
    
    chargeItem(item) {
        if (!item || !item.userData) return;
        
        // Для лучшей визуальной обратной связи, добавляем эффект заряда
        let emissiveColor;
        let particleColor;
        
        if (item.userData.type === 'crystal') {
            item.userData.isCharged = true;
            emissiveColor = new THREE.Color(0x00ffff);
            particleColor = 0x00ffff;
            audioSystem.play('crystal');
        } else if (item.userData.type === 'pentacle') {
            item.userData.isCharged = true;
            emissiveColor = new THREE.Color(0xCD853F);
            particleColor = 0xCD853F;
            audioSystem.play('ritual');
        } else if (item.userData.type === 'athame') {
            item.userData.isCharged = true;
            emissiveColor = new THREE.Color(0x808080);
            particleColor = 0x808080;
            audioSystem.play('ritual');
        } else if (item.userData.type === 'wand') {
            item.userData.isCharged = true;
            emissiveColor = new THREE.Color(0x8B4513);
            particleColor = 0x8B4513;
            audioSystem.play('ritual');
        } else {
            return; // Неизвестный тип предмета
        }
        
        // Применяем визуальный эффект
        item.material.emissive = emissiveColor;
        item.material.emissiveIntensity = 0.5;
        
        // Создаем частицы вокруг предмета
        const particleCount = 30;
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);
        
        const color = new THREE.Color(particleColor);
        
        for (let i = 0; i < particleCount; i++) {
            // Располагаем частицы вокруг предмета
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const radius = 0.2 + Math.random() * 0.2;
            
            particlePositions[i * 3] = item.position.x + radius * Math.sin(phi) * Math.cos(theta);
            particlePositions[i * 3 + 1] = item.position.y + radius * Math.sin(phi) * Math.sin(theta);
            particlePositions[i * 3 + 2] = item.position.z + radius * Math.cos(phi);
            
            particleColors[i * 3] = color.r;
            particleColors[i * 3 + 1] = color.g;
            particleColors[i * 3 + 2] = color.b;
        }
        
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.03,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);
        
        // Добавляем ссылку на частицы к объекту
        item.userData.particles = particles;
        
        // Анимация частиц
        const animateParticles = () => {
            if (!item.userData.isCharged || !item.userData.particles) {
                // Если предмет разряжен или частицы удалены, останавливаем анимацию
                if (item.userData.particles) {
                    scene.remove(item.userData.particles);
                    item.userData.particles = null;
                }
                return;
            }
            
            const positions = item.userData.particles.geometry.attributes.position.array;
            
            // Вращаем частицы вокруг предмета
            const time = Date.now() * 0.001;
            
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const x = positions[i3] - item.position.x;
                const z = positions[i3 + 2] - item.position.z;
                
                // Вращаем вокруг оси Y
                const newX = x * Math.cos(0.01) - z * Math.sin(0.01);
                const newZ = x * Math.sin(0.01) + z * Math.cos(0.01);
                
                positions[i3] = newX + item.position.x;
                positions[i3 + 2] = newZ + item.position.z;
                
                // Добавляем небольшие колебания
                positions[i3 + 1] += Math.sin(time + i) * 0.002;
            }
            
            item.userData.particles.geometry.attributes.position.needsUpdate = true;
            
            // Запускаем следующий кадр анимации
            requestAnimationFrame(animateParticles);
        };
        
        // Запускаем анимацию
        animateParticles();
    },
    
    burnHerb(herb) {
        if (!herb || !herb.userData) return;
        
        herb.userData.isBurning = true;
        herb.material.emissive = new THREE.Color(0x228B22);
        herb.material.emissiveIntensity = 0.5;
        audioSystem.play('ritual');
        
        // Добавляем более реалистичный эффект дыма
        const particleCount = 50;
        const smokeGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);
        
        // Инициализируем начальные позиции частиц
        for (let i = 0; i < particleCount; i++) {
            // Начальная позиция - над травой
            positions[i * 3] = herb.position.x + (Math.random() - 0.5) * 0.1;
            positions[i * 3 + 1] = herb.position.y + 0.2;
            positions[i * 3 + 2] = herb.position.z + (Math.random() - 0.5) * 0.1;
            
            // Цвет дыма: серый с оттенком зеленого
            colors[i * 3] = 0.5 + Math.random() * 0.1;     // R
            colors[i * 3 + 1] = 0.5 + Math.random() * 0.2; // G
            colors[i * 3 + 2] = 0.5 + Math.random() * 0.1; // B
            
            // Разные размеры частиц
            sizes[i] = 0.03 + Math.random() * 0.05;
        }
        
        smokeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        smokeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        smokeGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Создаем текстуру для частиц дыма
        const smokeTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/circle.png');
        
        const smokeMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            map: smokeTexture,
            transparent: true,
            opacity: 0.7,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        
        const smoke = new THREE.Points(smokeGeometry, smokeMaterial);
        scene.add(smoke);
        
        // Сохраняем ссылку на дым
        herb.userData.smoke = smoke;
        
        // Создаем объект для отслеживания состояния каждой частицы
        const particleState = new Array(particleCount).fill().map(() => ({
            speed: 0.002 + Math.random() * 0.002,
            opacity: 0.7 + Math.random() * 0.3,
            size: 0.03 + Math.random() * 0.05,
            age: 0,
            maxAge: 50 + Math.random() * 100
        }));
        
        // Функция анимации дыма
        const animateSmoke = () => {
            if (!herb.userData.isBurning || !herb.userData.smoke) {
                // Очищаем ресурсы, если трава перестала гореть
                if (herb.userData.smoke) {
                    scene.remove(herb.userData.smoke);
                    herb.userData.smoke = null;
                }
                return;
            }
            
            const positions = herb.userData.smoke.geometry.attributes.position.array;
            const colors = herb.userData.smoke.geometry.attributes.color.array;
            const sizes = herb.userData.smoke.geometry.attributes.size.array;
            
            // Обновляем каждую частицу
            for (let i = 0; i < particleCount; i++) {
                const state = particleState[i];
                state.age++;
                
                // Если частица достигла максимального возраста, перезапускаем её
                if (state.age >= state.maxAge) {
                    positions[i * 3] = herb.position.x + (Math.random() - 0.5) * 0.1;
                    positions[i * 3 + 1] = herb.position.y + 0.2;
                    positions[i * 3 + 2] = herb.position.z + (Math.random() - 0.5) * 0.1;
                    
                    state.age = 0;
                    state.opacity = 0.7 + Math.random() * 0.3;
                    state.speed = 0.002 + Math.random() * 0.002;
                    state.size = 0.03 + Math.random() * 0.05;
                } else {
                    // Движение вверх с небольшим случайным смещением
                    positions[i * 3] += (Math.random() - 0.5) * 0.003;
                    positions[i * 3 + 1] += state.speed;
                    positions[i * 3 + 2] += (Math.random() - 0.5) * 0.003;
                    
                    // Уменьшаем непрозрачность с возрастом
                    const opacityFactor = 1 - (state.age / state.maxAge);
                    herb.userData.smoke.material.opacity = Math.max(0.1, opacityFactor);
                    
                    // Увеличиваем размер с возрастом
                    sizes[i] = state.size * (1 + state.age / state.maxAge * 0.5);
                }
            }
            
            // Обновляем буферы геометрии
            herb.userData.smoke.geometry.attributes.position.needsUpdate = true;
            herb.userData.smoke.geometry.attributes.color.needsUpdate = true;
            herb.userData.smoke.geometry.attributes.size.needsUpdate = true;
            
            // Запускаем следующий кадр анимации
            requestAnimationFrame(animateSmoke);
        };
        
        // Запускаем анимацию дыма
        animateSmoke();
    },
    
    fillChalice(chalice) {
        if (!chalice || !chalice.userData) return;
        
        chalice.userData.isFilled = true;
        
        // Создаем эффект воды в чаше
        const waterGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16);
        const waterMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.7,
            emissive: 0x00ffff,
            emissiveIntensity: 0.3
        });
        
        const water = new THREE.Mesh(waterGeometry, waterMaterial);
        water.position.copy(chalice.position);
        water.position.y += 0.15; // Помещаем воду внутри чаши
        scene.add(water);
        
        // Сохраняем ссылку на воду, чтобы можно было удалить при отмене ритуала
        chalice.userData.water = water;
        
        // Добавляем визуальные эффекты
        chalice.material.emissive = new THREE.Color(0x00ffff);
        chalice.material.emissiveIntensity = 0.3;
        
        // Создаем пульсацию воды
        const pulseInterval = setInterval(() => {
            if (chalice.userData.water && chalice.userData.isFilled) {
                const scale = 0.9 + Math.sin(Date.now() / 500) * 0.1;
                chalice.userData.water.scale.set(scale, 1, scale);
                chalice.userData.water.material.opacity = 0.6 + Math.sin(Date.now() / 1000) * 0.1;
            } else {
                clearInterval(pulseInterval);
            }
        }, 50);
        
        audioSystem.play('ritual');
    },
    
    performRitual(ritual) {
        createParticles(ritual.color, ritual.particles, ritual.effect);
        
        // Добавляем свечение к магическому кругу
        magicCircle.material.emissiveIntensity = 2.0;
        
        // Создаем эффект пульсации
        const pulseEffect = {
            time: 0,
            duration: ritual.duration,
            active: true,
            effect: ritual.effect,
            intensity: 0
        };
        
        // Добавляем эффект в анимацию
        const originalAnimate = animate;
        animate = function() {
            if (pulseEffect.active) {
                pulseEffect.time += 16;
                pulseEffect.intensity = Math.sin(pulseEffect.time / 500) * 0.5 + 0.5;
                
                // Пульсация круга
                magicCircle.material.emissiveIntensity = 2.0 + pulseEffect.intensity;
                
                // Анимация частиц
                const positions = particleSystem.geometry.attributes.position.array;
                const velocities = particleSystem.geometry.attributes.velocity.array;
                
                for (let i = 0; i < positions.length; i += 3) {
                    switch(pulseEffect.effect) {
                        case "shield":
                            // Улучшенное вращение щита
                            const radius = 2 + pulseEffect.intensity * 0.5;
                            const angle = pulseEffect.time / 1000;
                            positions[i] = radius * Math.sin(angle + i) * Math.cos(angle);
                            positions[i + 1] = radius * Math.sin(angle + i) * Math.sin(angle);
                            positions[i + 2] = radius * Math.cos(angle + i);
                            break;
                            
                        case "wave":
                            // Улучшенное волнообразное движение
                            positions[i + 1] += Math.sin(pulseEffect.time / 1000 + i) * 0.02 * pulseEffect.intensity;
                            break;
                            
                        case "portal":
                            // Улучшенное вращение портала
                            const portalAngle = pulseEffect.time / 800;
                            const portalRadius = 1 + positions[i + 1] * 0.5 + pulseEffect.intensity * 0.5;
                            positions[i] = Math.cos(portalAngle + i) * portalRadius;
                            positions[i + 2] = Math.sin(portalAngle + i) * portalRadius;
                            break;
                            
                        case "heal":
                            // Улучшенное восходящее движение
                            positions[i + 1] += 0.01 * pulseEffect.intensity;
                            if (positions[i + 1] > 3) positions[i + 1] = 0;
                            break;
                            
                        case "vision":
                            // Улучшенное хаотичное движение
                            positions[i] += velocities[i] * pulseEffect.intensity;
                            positions[i + 1] += velocities[i + 1] * pulseEffect.intensity;
                            positions[i + 2] += velocities[i + 2] * pulseEffect.intensity;
                            break;
                    }
                }
                
                particleSystem.geometry.attributes.position.needsUpdate = true;
                
                // Проверяем окончание ритуала
                if (pulseEffect.time >= ritual.duration) {
                    pulseEffect.active = false;
                    magicCircle.material.emissiveIntensity = 1.0;
                    animate = originalAnimate;
                    ritualSystem.completeRitual();
                }
            }
            
            originalAnimate();
        };
    },
    
    completeRitual() {
        this.isActive = false;
        this.currentRitual = null;
        this.currentStep = 0;
        this.steps = [];
        
        // Удаляем панель ритуала
        const ritualPanel = document.querySelector('.ritual-panel');
        if (ritualPanel) {
            ritualPanel.remove();
        }
        
        // Создаем и отображаем сообщение о завершении ритуала
        const completeDiv = document.createElement('div');
        completeDiv.style.position = 'absolute';
        completeDiv.style.top = '50%';
        completeDiv.style.left = '50%';
        completeDiv.style.transform = 'translate(-50%, -50%)';
        completeDiv.style.background = 'rgba(0, 0, 0, 0.8)';
        completeDiv.style.color = '#ffd700';
        completeDiv.style.padding = '20px';
        completeDiv.style.borderRadius = '10px';
        completeDiv.style.fontFamily = "'Cinzel', Arial, sans-serif";
        completeDiv.style.zIndex = '1050';
        completeDiv.style.textAlign = 'center';
        completeDiv.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.3)';
        completeDiv.style.border = '1px solid #ffd700';
        completeDiv.innerHTML = '<h2>Ритуал успешно завершен!</h2><p>Магия наполняет комнату энергией...</p>';
        document.body.appendChild(completeDiv);
        
        // Показываем панель выбора ритуала
        setTimeout(() => {
            const ritualSelection = document.getElementById('ritual-selection');
            if (ritualSelection) {
                ritualSelection.style.display = 'block';
            }
            completeDiv.remove();
        }, 3000);
    },
    
    createRitualUI() {
        const ritualPanel = document.createElement('div');
        ritualPanel.className = 'ritual-panel';
        ritualPanel.innerHTML = `
            <div class="ritual-title">Ритуал</div>
            <div class="ritual-steps"></div>
            <div class="ritual-controls">
                <button class="ritual-button" id="startRitual">Начать ритуал</button>
                <button class="ritual-button" id="cancelRitual">Отменить</button>
            </div>
        `;
        document.body.appendChild(ritualPanel);

        // Добавляем стили
        const style = document.createElement('style');
        style.textContent = `
            .ritual-panel {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.8);
                padding: 20px;
                border-radius: 10px;
                color: white;
                font-family: 'Arial', sans-serif;
                min-width: 300px;
            }
            .ritual-title {
                font-size: 24px;
                margin-bottom: 15px;
                text-align: center;
                color: #ffd700;
            }
            .ritual-steps {
                margin-bottom: 20px;
                max-height: 300px;
                overflow-y: auto;
            }
            .ritual-step {
                padding: 10px;
                margin: 5px 0;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .ritual-step:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            .ritual-step.active-step {
                background: rgba(255, 215, 0, 0.3);
                border: 1px solid #ffd700;
            }
            .ritual-step.completed {
                background: rgba(0, 255, 0, 0.2);
                border: 1px solid #00ff00;
            }
            .ritual-controls {
                display: flex;
                justify-content: space-between;
                gap: 10px;
            }
            .ritual-button {
                padding: 10px 20px;
                background: #4a4a4a;
                border: none;
                border-radius: 5px;
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .ritual-button:hover {
                background: #666;
            }
            .ritual-button:disabled {
                background: #333;
                cursor: not-allowed;
            }
        `;
        document.head.appendChild(style);
    },
    
    checkCircleProgress() {
        // Если это первый шаг, инициализируем начальные значения
        if (!this.lastPosition) {
            this.lastPosition = new THREE.Vector3(camera.position.x, 0, camera.position.z);
            this.circleProgress = 0;
            this.startAngle = Math.atan2(
                camera.position.z - magicCircle.position.z,
                camera.position.x - magicCircle.position.x
            );
            this.lastAngle = this.startAngle;
            return false;
        }

        // Вычисляем расстояние до центра круга
        const distance = Math.sqrt(
            Math.pow(camera.position.x - magicCircle.position.x, 2) +
            Math.pow(camera.position.z - magicCircle.position.z, 2)
        );

        // Если игрок вышел за пределы круга
        if (distance > 2) {
            this.showInstruction('Вернитесь в пределы магического круга');
            return false;
        }

        // Вычисляем текущий угол
        const currentAngle = Math.atan2(
            camera.position.z - magicCircle.position.z,
            camera.position.x - magicCircle.position.x
        );

        // Вычисляем разницу углов
        let angleDiff = currentAngle - this.lastAngle;

        // Корректируем разницу углов для правильного определения направления
        if (angleDiff > Math.PI) {
            angleDiff -= 2 * Math.PI;
        } else if (angleDiff < -Math.PI) {
            angleDiff += 2 * Math.PI;
        }

        // Проверяем направление движения
        if (angleDiff > 0) {
            // Движение по часовой стрелке
            this.circleProgress += angleDiff;
            
            // Показываем прогресс
            const progressPercent = Math.min(100, (this.circleProgress / (2 * Math.PI)) * 100);
            this.showInstruction(`Прогресс обхода: ${Math.round(progressPercent)}%`);
            
            // Если круг завершен
            if (this.circleProgress >= 2 * Math.PI) {
                this.circleProgress = 0;
                this.lastPosition = null;
                this.startAngle = null;
                this.lastAngle = null;
                return true;
            }
        } else {
            // Движение против часовой стрелки
            this.showInstruction('Двигайтесь по часовой стрелке');
        }

        this.lastAngle = currentAngle;
        this.lastPosition.set(camera.position.x, 0, camera.position.z);
        return false;
    },
    
    getDirectionText(angle) {
        // Преобразуем угол в градусы и нормализуем его
        let degrees = (angle * 180 / Math.PI + 360) % 360;
        
        // Определяем направление на основе угла
        if (degrees >= 337.5 || degrees < 22.5) return 'Восток';
        if (degrees >= 22.5 && degrees < 67.5) return 'Юго-Восток';
        if (degrees >= 67.5 && degrees < 112.5) return 'Юг';
        if (degrees >= 112.5 && degrees < 157.5) return 'Юго-Запад';
        if (degrees >= 157.5 && degrees < 202.5) return 'Запад';
        if (degrees >= 202.5 && degrees < 247.5) return 'Северо-Запад';
        if (degrees >= 247.5 && degrees < 292.5) return 'Север';
        if (degrees >= 292.5 && degrees < 337.5) return 'Северо-Восток';
    },
    
    updateProgressIndicator(percent) {
        let indicator = document.getElementById('circle-progress');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'circle-progress';
            indicator.className = 'magic-ui';
            indicator.style.position = 'absolute';
            indicator.style.top = '50%';
            indicator.style.left = '50%';
            indicator.style.transform = 'translate(-50%, -50%)';
            indicator.style.background = 'rgba(0, 0, 0, 0.7)';
            indicator.style.padding = '15px';
            indicator.style.borderRadius = '10px';
            indicator.style.border = '1px solid #ffd700';
            indicator.style.zIndex = '1000';
            document.body.appendChild(indicator);
        }
        
        indicator.innerHTML = `
            <div style="color: #ffd700; margin-bottom: 5px;">Прогресс обхода</div>
            <div style="width: 200px; height: 10px; background: rgba(255, 255, 255, 0.1); border-radius: 5px; overflow: hidden;">
                <div style="width: ${percent}%; height: 100%; background: linear-gradient(90deg, #ffd700, #ffa500); transition: width 0.3s ease;"></div>
            </div>
            <div style="color: #ffd700; margin-top: 5px; text-align: center;">${Math.round(percent)}%</div>
        `;
    },
    
    removeProgressIndicator() {
        const indicator = document.getElementById('circle-progress');
        if (indicator) {
            indicator.remove();
        }
    }
};

// Обновляем систему управления
const controls = new THREE.PointerLockControls(camera, document.body);

// Добавляем обработчик клика для активации управления
document.addEventListener('click', function () {
    if (!controls.isLocked) {
        controls.lock();
        
        // Скрываем стандартную инструкцию
        const infoElement = document.getElementById('info');
        if (infoElement) {
            infoElement.style.opacity = '0';
            setTimeout(() => {
                infoElement.style.display = 'none';
            }, 300);
        }
    }
});

// Добавляем переменные для работы с мышью
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Создаем функцию для визуальных эффектов при взаимодействии
function createInteractionEffect(position) {
    // Создаем систему частиц для эффекта взаимодействия
    const particleCount = 50;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
        // Позиция частицы вокруг точки взаимодействия
        positions[i * 3] = position.x + (Math.random() - 0.5) * 0.5;
        positions[i * 3 + 1] = position.y + (Math.random() - 0.5) * 0.5;
        positions[i * 3 + 2] = position.z + (Math.random() - 0.5) * 0.5;
        
        // Цвет частицы (золотой)
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.84;
        colors[i * 3 + 2] = 0.0;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Анимация исчезновения частиц
    let opacity = 0.8;
    const fadeOut = setInterval(() => {
        opacity -= 0.05;
        material.opacity = opacity;
        
        // Перемещаем частицы вверх и в стороны
        const positions = particles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += (Math.random() - 0.5) * 0.02;
            positions[i + 1] += 0.01;
            positions[i + 2] += (Math.random() - 0.5) * 0.02;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        
        if (opacity <= 0) {
            clearInterval(fadeOut);
            scene.remove(particles);
            particles.geometry.dispose();
            material.dispose();
        }
    }, 50);
}

// Обновляем обработчик кликов
window.addEventListener('click', (event) => {
    if (!controls.isLocked) {
        controls.lock();
        return;
    }
    
    // Используем луч из центра экрана
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    
    // Собираем все интерактивные объекты в один массив
    const interactiveObjects = [
        ...ritualItems.candles,
        ...ritualItems.crystals,
        ...ritualItems.herbs,
        ritualItems.pentacle,
        ritualItems.athame,
        ritualItems.chalice,
        ritualItems.wand,
        ritualItems.incense
    ].filter(obj => obj != null);
    
    // Проверяем пересечения с интерактивными объектами
    const intersects = raycaster.intersectObjects(interactiveObjects, true);
    
    if (intersects.length > 0) {
        const intersectObj = intersects[0].object;
        const distance = intersects[0].distance;
        
        // Находим объект в ритуальных принадлежностях
        let item = intersectObj;
        
        // Если не нашли тип в самом объекте, ищем в родительских объектах
        if (!item.userData || !item.userData.type) {
            let parentObj = item;
            while (parentObj.parent && (!parentObj.userData || !parentObj.userData.type)) {
                parentObj = parentObj.parent;
            }
            if (parentObj.userData && parentObj.userData.type) {
                item = parentObj;
            }
        }
        
        // Проверяем расстояние до объекта
        if (item.userData && item.userData.type && distance < 3) {
            // Создаем эффект в точке взаимодействия
            createInteractionEffect(intersects[0].point);
    
            // Проверяем, требует ли текущий шаг деактивации
            const currentStep = ritualSystem.isActive ? ritualSystem.steps[ritualSystem.currentStep] : null;
            const requiresDeactivation = currentStep && currentStep.requiresDeactivation;
    
            // Выполняем действие с предметом в зависимости от требования деактивации
            switch(item.userData.type) {
                case 'crystal':
                case 'pentacle':
                case 'athame':
                case 'wand':
                    if (requiresDeactivation) {
                        if (item.userData.isCharged) {
                            item.userData.isCharged = false;
                            item.material.emissiveIntensity = 0;
                            if (item.userData.particles) {
                                scene.remove(item.userData.particles);
                                item.userData.particles = null;
                            }
                        }
                    } else if (!item.userData.isCharged) {
                        item.userData.isCharged = true;
                        ritualSystem.chargeItem(item);
                    }
                    break;

                case 'herb':
                    if (requiresDeactivation) {
                        if (item.userData.isBurning) {
                            item.userData.isBurning = false;
                            item.material.emissiveIntensity = 0;
                            if (item.userData.smoke) {
                                scene.remove(item.userData.smoke);
                                item.userData.smoke = null;
                            }
                        }
                    } else if (!item.userData.isBurning) {
                        item.userData.isBurning = true;
                        ritualSystem.burnHerb(item);
                    }
                    break;

                case 'chalice':
                    if (requiresDeactivation) {
                        if (item.userData.isFilled) {
                            item.userData.isFilled = false;
                            if (item.userData.water) {
                                scene.remove(item.userData.water);
                                item.userData.water = null;
                            }
                        }
                    } else if (!item.userData.isFilled) {
                        item.userData.isFilled = true;
                        ritualSystem.fillChalice(item);
                    }
                    break;

                case 'candle':
                    if (requiresDeactivation) {
                        if (item.userData.isLit) {
                            item.userData.isLit = false;
                            if (item.userData.light) {
                                item.userData.light.visible = false;
                            }
                            if (item.userData.flame) {
                                item.userData.flame.visible = false;
                            }
                        }
                    } else if (!item.userData.isLit) {
                        item.userData.isLit = true;
                        if (!item.userData.light) {
                            const candleLight = new THREE.PointLight(0xff6600, 1, 2);
                            candleLight.position.copy(item.position);
                            candleLight.position.y += 0.5;
                            item.userData.light = candleLight;
                            scene.add(candleLight);
                        }
                        if (!item.userData.flame) {
                            const flameGeometry = new THREE.ConeGeometry(0.1, 0.3, 8);
                            const flameMaterial = new THREE.MeshStandardMaterial({
                                color: 0xff6600,
                                emissive: 0xff3300,
                                emissiveIntensity: 0.5
                            });
                            const flame = new THREE.Mesh(flameGeometry, flameMaterial);
                            flame.position.copy(item.position);
                            flame.position.y += 0.6;
                            item.userData.flame = flame;
                            scene.add(flame);
                        }
                        item.userData.light.visible = true;
                        item.userData.flame.visible = true;
                        audioSystem.play('candle');

                        const flickerInterval = setInterval(() => {
                            if (item.userData.flame && item.userData.isLit) {
                                item.userData.flame.scale.set(
                                    0.9 + Math.random() * 0.2,
                                    0.9 + Math.random() * 0.2,
                                    0.9 + Math.random() * 0.2
                                );
                                item.userData.flame.material.emissiveIntensity = 0.4 + Math.random() * 0.2;
                                if (item.userData.light) {
                                    item.userData.light.intensity = 0.8 + Math.random() * 0.4;
                                }
                            } else {
                                clearInterval(flickerInterval);
                            }
                        }, 100);
                    }
                    break;

                case 'incense':
                    if (requiresDeactivation) {
                        if (item.userData.isLit) {
                            item.userData.isLit = false;
                            if (item.userData.smoke) {
                                item.userData.smoke.visible = false;
                            }
                        }
                    } else if (!item.userData.isLit) {
                        item.userData.isLit = true;
                        if (!item.userData.smoke) {
                            const smokeGeometry = new THREE.CylinderGeometry(0.05, 0.2, 0.5, 8);
                            const smokeMaterial = new THREE.MeshStandardMaterial({
                                color: 0x808080,
                                transparent: true,
                                opacity: 0.5
                            });
                            const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);
                            smoke.position.copy(item.position);
                            smoke.position.y += 0.3;
                            item.userData.smoke = smoke;
                            scene.add(smoke);
                        }
                        item.userData.smoke.visible = true;
                        audioSystem.play('ritual');

                        const smokeInterval = setInterval(() => {
                            if (item.userData.smoke && item.userData.isLit) {
                                item.userData.smoke.position.y += 0.005;
                                item.userData.smoke.scale.x += 0.001;
                                item.userData.smoke.scale.z += 0.001;
                                item.userData.smoke.material.opacity -= 0.002;

                                if (item.userData.smoke.position.y > item.position.y + 1.5) {
                                    item.userData.smoke.position.y = item.position.y + 0.3;
                                    item.userData.smoke.scale.set(1, 1, 1);
                                    item.userData.smoke.material.opacity = 0.5;
                                }
                            } else {
                                clearInterval(smokeInterval);
                            }
                        }, 50);
                    }
                    break;
            }
            
            // Если ритуал активен, проверяем текущий шаг
            if (ritualSystem.isActive) {
                ritualSystem.nextStep();
            }
            return;
        }
    }
    
    // Если не было взаимодействия с предметом и активен ритуал, проверяем текущий шаг
    if (ritualSystem.isActive) {
        ritualSystem.nextStep();
    }
});

// Обновляем обработку клавиш WASD
const moveSpeed = 0.1;
const keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

document.addEventListener('keydown', (event) => {
    if (controls.isLocked && keys.hasOwnProperty(event.key)) {
        keys[event.key] = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (controls.isLocked && keys.hasOwnProperty(event.key)) {
        keys[event.key] = false;
    }
});

// Добавляем обработку ESC для выхода из режима управления
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        controls.unlock();
    }
});

// Добавляем систему частиц для свечей
function updateCandleParticles() {
    // Проверяем, существует ли система частиц
    if (!candleParticleSystem || !candleParticleSystem.geometry) {
        return;
    }
    
    const positions = [];
    const colors = [];
    
    ritualItems.candles.forEach(candle => {
        if (candle.userData.isLit) {
            for (let i = 0; i < 10; i++) {
                positions.push(
                    candle.position.x + (Math.random() - 0.5) * 0.2,
                    candle.position.y + Math.random() * 0.5,
                    candle.position.z + (Math.random() - 0.5) * 0.2
                );
                colors.push(1, 0.4, 0);
            }
        }
    });
    
    candleParticleSystem.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    candleParticleSystem.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
}

// Функция для визуального выделения объектов при наведении
function highlightInteractiveObject(object, isHighlighted) {
    if (!object || !object.material) return;
    
    if (isHighlighted) {
        // Сохраняем оригинальное состояние материала, если еще не сохранено
        if (!object.userData.originalEmissive) {
            object.userData.originalEmissive = object.material.emissive ? object.material.emissive.clone() : new THREE.Color(0x000000);
            object.userData.originalEmissiveIntensity = object.material.emissiveIntensity || 0;
        }
        
        // Выделяем объект золотистым цветом
        object.material.emissive = new THREE.Color(0xffd700);
        object.material.emissiveIntensity = 0.3;
    } else if (object.userData.originalEmissive) {
        // Возвращаем оригинальное состояние
        object.material.emissive = object.userData.originalEmissive;
        object.material.emissiveIntensity = object.userData.originalEmissiveIntensity;
    }
}

// Обновляем функцию updateRaycaster с той же логикой
function updateRaycaster() {
    if (!controls.isLocked) return;
    
    // Сначала сбрасываем подсветку всех интерактивных объектов
    resetAllHighlights();
    
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    
    // Собираем все интерактивные объекты в один массив
    const interactiveObjects = [
        ...ritualItems.candles,
        ...ritualItems.crystals,
        ...ritualItems.herbs,
        ritualItems.pentacle,
        ritualItems.athame,
        ritualItems.chalice,
        ritualItems.wand,
        ritualItems.incense
    ].filter(obj => obj != null);
    
    // Проверяем пересечения с интерактивными объектами
    const intersects = raycaster.intersectObjects(interactiveObjects, true);
    
    let showInteraction = false;
    let interactionMessage = '';
    let highlightedObject = null;
    
    if (intersects.length > 0) {
        const intersectObj = intersects[0].object;
        const distance = intersects[0].distance;
        
        // Находим объект в ритуальных принадлежностях
        let item = intersectObj;
        
        // Если не нашли тип в самом объекте, ищем в родительских объектах
        if (!item.userData || !item.userData.type) {
            let parentObj = item;
            while (parentObj.parent && (!parentObj.userData || !parentObj.userData.type)) {
                parentObj = parentObj.parent;
            }
            if (parentObj.userData && parentObj.userData.type) {
                item = parentObj;
            }
        }
        
        // Проверяем расстояние до объекта
        if (item.userData && item.userData.type && distance < 3) {
            showInteraction = true;
            highlightedObject = item;
            
            // Проверяем, требует ли текущий шаг деактивации
            const currentStep = ritualSystem.isActive ? ritualSystem.steps[ritualSystem.currentStep] : null;
            const requiresDeactivation = currentStep && currentStep.requiresDeactivation;

            switch(item.userData.type) {
                case 'crystal':
                    if (requiresDeactivation) {
                        if (item.userData.isCharged) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы разрядить кристалл';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    } else {
                        if (!item.userData.isCharged) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы зарядить кристалл';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    }
                    break;
                case 'pentacle':
                    if (requiresDeactivation) {
                        if (item.userData.isCharged) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы разрядить пентакль';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    } else {
                        if (!item.userData.isCharged) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы зарядить пентакль';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    }
                    break;
                case 'athame':
                    if (requiresDeactivation) {
                        if (item.userData.isCharged) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы разрядить атам';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    } else {
                        if (!item.userData.isCharged) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы зарядить атам';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    }
                    break;
                case 'wand':
                    if (requiresDeactivation) {
                        if (item.userData.isCharged) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы разрядить волшебную палочку';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    } else {
                        if (!item.userData.isCharged) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы зарядить волшебную палочку';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    }
                    break;
                case 'herb':
                    if (requiresDeactivation) {
                        if (item.userData.isBurning) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы потушить травы';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    } else {
                        if (!item.userData.isBurning) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы поджечь травы';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    }
                    break;
                case 'chalice':
                    if (requiresDeactivation) {
                        if (item.userData.isFilled) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы опустошить чашу';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    } else {
                        if (!item.userData.isFilled) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы наполнить чашу';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    }
                    break;
                case 'candle':
                    if (requiresDeactivation) {
                        if (item.userData.isLit) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы погасить свечу';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    } else {
                        if (!item.userData.isLit) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы зажечь свечу';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    }
                    break;
                case 'incense':
                    if (requiresDeactivation) {
                        if (item.userData.isLit) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы погасить благовония';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    } else {
                        if (!item.userData.isLit) {
                            interactionMessage = 'Нажмите ЛКМ, чтобы зажечь благовония';
                        } else {
                            showInteraction = false;
                            highlightedObject = null;
                        }
                    }
                    break;
            }
        }
    }
    
    // Подсвечиваем выбранный объект
    if (highlightedObject) {
        highlightInteractiveObject(highlightedObject, true);
    }
    
    // Обновляем текст взаимодействия
    const interactionText = document.getElementById('interaction-text');
    if (interactionText) {
        if (showInteraction) {
            interactionText.textContent = interactionMessage;
            interactionText.style.display = 'block';
        } else {
            interactionText.style.display = 'none';
        }
    }
    
    // Обновляем состояние прицела
    updateCrosshair(showInteraction);
}

// Функция для сброса всех подсветок
function resetAllHighlights() {
    // Сбрасываем подсветку кристаллов
    ritualItems.crystals.forEach(crystal => {
        if (crystal && crystal.userData && crystal.material) {
            highlightInteractiveObject(crystal, false);
        }
    });
    
    // Сбрасываем подсветку трав
    ritualItems.herbs.forEach(herb => {
        if (herb && herb.userData && herb.material) {
            highlightInteractiveObject(herb, false);
        }
    });
    
    // Сбрасываем подсветку свечей
    ritualItems.candles.forEach(candle => {
        if (candle && candle.userData && candle.material && !candle.userData.isLit) {
            highlightInteractiveObject(candle, false);
        }
    });
    
    // Сбрасываем подсветку других предметов
    const otherItems = [
        ritualItems.pentacle,
        ritualItems.athame,
        ritualItems.chalice,
        ritualItems.wand,
        ritualItems.incense
    ];
    
    otherItems.forEach(item => {
        if (item && item.userData && item.material) {
            highlightInteractiveObject(item, false);
        }
    });
}

// Обновляем функцию updateCrosshair
function updateCrosshair(isInteractive = false) {
    const crosshair = document.getElementById('crosshair');
    if (!crosshair) return;
    
    if (controls.isLocked) {
        crosshair.style.display = 'block';
        
        if (isInteractive) {
            crosshair.style.borderColor = '#00ff00';
            crosshair.style.boxShadow = '0 0 5px rgba(0, 255, 0, 0.5)';
        } else {
            crosshair.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            crosshair.style.boxShadow = 'none';
        }
    } else {
        crosshair.style.display = 'none';
    }
}

// Обновляем функцию animate
function animate() {
    requestAnimationFrame(animate);

    if (controls.isLocked) {
        if (keys.w) controls.moveForward(moveSpeed);
        if (keys.s) controls.moveForward(-moveSpeed);
        if (keys.a) controls.moveRight(-moveSpeed);
        if (keys.d) controls.moveRight(moveSpeed);
        
        updateRaycaster();
    }

    updateCandleParticles();
    renderer.render(scene, camera);
}

// Обработка изменения размера окна
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Добавляем обработку ошибок
window.addEventListener('error', function(e) {
    const errorDiv = document.getElementById('error');
    errorDiv.style.display = 'block';
    errorDiv.textContent = 'Произошла ошибка: ' + e.message;
});

// Инициализируем аудио систему
audioSystem.init();

// Добавляем функцию для активации ритуала
function activateRitual(ritualType) {
    if (ritualSystem.isActive) {
        alert('Сначала завершите текущий ритуал!');
        return;
    }
    
    // Скрываем панель выбора ритуала при активации ритуала
    const ritualSelection = document.getElementById('ritual-selection');
    if (ritualSelection) {
        ritualSelection.style.display = 'none';
    }
    
    ritualSystem.initRitual(ritualType);
}

// Добавляем обработчики для кнопок ритуалов
document.addEventListener('DOMContentLoaded', () => {
    const ritualButtons = document.querySelectorAll('.ritual-button');
    ritualButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Предотвращаем всплытие события, чтобы избежать ошибок
            event.stopPropagation();
            const ritualType = button.getAttribute('data-ritual');
            if (ritualType) {
                activateRitual(ritualType);
            }
        });
    });
    
    // Скрываем инструкцию после начала управления
    document.addEventListener('click', () => {
        if (controls && controls.isLocked) {
            const info = document.getElementById('info');
            if (info) {
                info.style.opacity = '0';
                setTimeout(() => {
                    info.style.display = 'none';
                }, 300);
            }
        }
    });
});

// Обновляем стили для интерфейса
const styles = `
    .magic-ui {
        font-family: 'Cinzel', serif;
        color: #e0e0e0;
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
        font-size: 0.9em;
        background: rgba(0, 0, 0, 0.7);
        border: 1px solid #4a4a4a;
        border-radius: 8px;
        padding: 12px;
        backdrop-filter: blur(5px);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
    
    .ritual-panel {
        position: absolute;
        top: 15px;
        right: 15px;
        max-width: 300px;
        z-index: 200;
        max-height: 70vh;
        overflow-y: auto;
    }
    
    .ritual-title {
        font-size: 1.1em;
        margin-bottom: 8px;
        color: #ffd700;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    
    .ritual-description {
        font-size: 0.8em;
        margin-bottom: 12px;
        line-height: 1.3;
        color: #b0b0b0;
    }
    
    .ritual-steps {
        max-height: 300px;
        overflow-y: auto;
        padding-right: 5px;
    }
    
    .ritual-steps::-webkit-scrollbar {
        width: 5px;
    }
    
    .ritual-steps::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
    }
    
    .ritual-steps::-webkit-scrollbar-thumb {
        background: rgba(255, 215, 0, 0.3);
        border-radius: 3px;
    }
    
    .ritual-step {
        background: rgba(255, 255, 255, 0.05);
        padding: 12px;
        border-radius: 6px;
        margin-bottom: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.2s ease;
    }
    
    .ritual-step.active-step {
        background: rgba(255, 215, 0, 0.1);
        border-color: #ffd700;
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
    }
    
    .ritual-step.completed {
        background: rgba(0, 255, 0, 0.1);
        border-color: #00ff00;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
    }
    
    .step-number {
        font-size: 0.7em;
        color: #ffd700;
        margin-bottom: 4px;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .step-text {
        font-size: 0.85em;
        margin-bottom: 6px;
        line-height: 1.4;
    }
    
    .step-progress {
        height: 2px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 1px;
        margin-top: 6px;
    }
    
    .step-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #ffd700, #ffa500);
        border-radius: 1px;
        transition: width 0.2s ease;
    }
    
    .controls-panel {
        position: absolute;
        bottom: 15px;
        left: 15px;
        z-index: 210;
    }
    
    .interaction-hint {
        position: absolute;
        bottom: 120px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 20px;
        font-size: 0.9em;
        color: #ffd700;
        text-align: center;
        transition: all 0.2s ease;
        max-width: 300px;
        z-index: 220;
        pointer-events: none;
    }
    
    #movement-instruction {
        position: absolute;
        top: 15px;
        left: 15px;
        padding: 12px;
        font-size: 0.8em;
        z-index: 140;
        max-width: 250px;
    }
    
    #interaction-text {
        position: absolute;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 20px;
        font-size: 0.8em;
        z-index: 130;
        max-width: 300px;
        text-align: center;
        display: none;
        pointer-events: none;
    }
    
    .ritual-buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 15px;
    }
    
    .ritual-button {
        background: linear-gradient(45deg, #2c2c2c, #1a1a1a);
        border: 1px solid #4a4a4a;
        color: #e0e0e0;
        padding: 12px 15px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 0.9em;
        text-transform: uppercase;
        letter-spacing: 1px;
        width: 100%;
        box-sizing: border-box;
        text-align: left;
        position: relative;
        overflow: hidden;
    }
    
    .ritual-button:hover {
        background: linear-gradient(45deg, #3c3c3c, #2a2a2a);
        border-color: #6a6a6a;
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    .ritual-button::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
        );
        transition: transform 0.3s ease;
    }
    
    .ritual-button:hover::after {
        transform: translateX(100%);
    }
    
    .control-key {
        display: inline-block;
        background: rgba(255, 255, 255, 0.05);
        padding: 4px 8px;
        margin: 2px;
        border-radius: 4px;
        font-size: 0.8em;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    @media (max-height: 600px) {
        .ritual-panel {
            max-height: 60vh;
        }
        .ritual-steps {
            max-height: 150px;
        }
    }
    
    @media (max-width: 768px) {
        .magic-ui {
            font-size: 0.8em;
            padding: 8px 12px;
        }
    }
`;

// Добавляем стили на страницу
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Обновляем создание интерфейса ритуала
ritualSystem.createRitualUI = function() {
    // Удаляем предыдущий интерфейс ритуала, если есть
    const existingUI = document.querySelector('.ritual-panel');
    if (existingUI) {
        existingUI.remove();
    }

    const ritualUI = document.createElement('div');
    ritualUI.className = 'ritual-panel magic-ui';
    ritualUI.innerHTML = `
        <div class="ritual-title">${this.currentRitual.name}</div>
        <div class="ritual-description">${this.currentRitual.description}</div>
        <div class="ritual-steps">
            ${this.steps.map((step, index) => `
                <div class="ritual-step ${index === this.currentStep ? 'active' : ''} ${index < this.currentStep ? 'completed' : ''}">
                    <div class="step-number">Шаг ${index + 1} из ${this.steps.length}</div>
                    <div class="step-text">${step.text}</div>
                    <div class="step-progress">
                        <div class="step-progress-bar" style="width: ${index < this.currentStep ? '100%' : '0%'}"></div>
                    </div>
                </div>
            `).join('')}
        </div>
        <button onclick="ritualSystem.cancelRitual()" class="ritual-button" style="margin-top: 20px; width: 100%;">
            Отменить ритуал
        </button>
    `;
    document.body.appendChild(ritualUI);
};

// Обновляем создание инструкций
ritualSystem.showInstruction = function(text) {
    // Удаляем предыдущую инструкцию, если есть
    const existingInstruction = document.querySelector('.interaction-hint');
    if (existingInstruction) {
        existingInstruction.remove();
    }

    const instructionDiv = document.createElement('div');
    instructionDiv.className = 'interaction-hint magic-ui';
    instructionDiv.innerHTML = `
        <div>${text}</div>
        <div style="margin-top: 10px; font-size: 0.9em; color: #b0b0b0;">
            Нажмите ЛКМ для проверки
        </div>
    `;
    document.body.appendChild(instructionDiv);
};

// Обновляем создание панели управления
function createControlsPanel() {
    // Удаляем предыдущую панель, если есть
    const existingPanel = document.querySelector('.controls-panel');
    if (existingPanel) {
        existingPanel.remove();
    }

    const controlsPanel = document.createElement('div');
    controlsPanel.className = 'controls-panel magic-ui';
    controlsPanel.innerHTML = `
        <div style="margin-bottom: 10px; color: #ffd700;">Управление</div>
        <div>
            <span class="control-key">W</span>
            <span class="control-key">A</span>
            <span class="control-key">S</span>
            <span class="control-key">D</span>
            <span class="control-key">Мышь</span>
            <span class="control-key">ESC</span>
        </div>
        <div style="margin-top: 10px; font-size: 0.8em; color: #b0b0b0;">
            Перемещение • Осмотр • Выход
        </div>
    `;
    document.body.appendChild(controlsPanel);
}

// Обновляем указатель мыши
function createCrosshair() {
    // Используем существующий #crosshair из HTML
    let crosshair = document.getElementById('crosshair');
    
    if (!crosshair) {
        crosshair = document.createElement('div');
        crosshair.id = 'crosshair';
        document.body.appendChild(crosshair);
    }
    
    return crosshair;
}

// Инициализируем интерфейс
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем наличие интерактивного элемента текста
    if (!document.getElementById('interaction-text')) {
        const interactionText = document.createElement('div');
        interactionText.id = 'interaction-text';
        document.body.appendChild(interactionText);
    }
    
    createControlsPanel();
    createCrosshair();
});

animate(); 