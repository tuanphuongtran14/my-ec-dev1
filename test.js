async function c() {
    console.log(1);
}

function b() {
    return c();
}

function a() {
    return b();
}

async function main() {
    await a();
    console.log(2);
};

main();