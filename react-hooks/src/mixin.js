
export const SingerMixin = {
    sing(sound) {
        alert(sound);
    },
    componentWillMount() {
        console.log('componentWillMounted222');
    }

}

export const FlyMixin = {
    fly() { console.log('fly') },
    land() { }
}
