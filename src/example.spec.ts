class Friendslist {
    friends = [];

    addFriend(name){
        this.friends.push(name);
        this.announceFriendship(name);
    }

    announceFriendship(name){
        console.log(`${name} is now a friend!`);
    }

    removeFriend(name){
        const idx = this.friends.indexOf(name);
        if(idx === -1){
            throw new Error('Friend not found!')
        }
        this.friends.splice(idx, 1)
    }
}

describe(('testing adding friends'), () => {
    let friendsList;

    beforeEach(() => {
        friendsList = new Friendslist();
    });

    it('initialize friends list', () => {
        expect(friendsList.friends.length).toEqual(0);
    })

    it('adding new friend', () => {
        friendsList.addFriend('Andrew');
        expect(friendsList.friends.length).toEqual(1);
    })

    it('announces friendship', () => {
         friendsList.announceFriendship = jest.fn();
         expect(friendsList.announceFriendship).not.toHaveBeenCalled();
         friendsList.addFriend('Andrew 2');
         expect(friendsList.announceFriendship).toHaveBeenCalledTimes(1);
    })
    describe(('remove friend'), () => {
        it(('remove friend from the list'), () => {
            friendsList.addFriend('Andrew');
            expect(friendsList.friends[0]).toEqual('Andrew');
            friendsList.removeFriend('Andrew');
            expect(friendsList.friends[0]).toBeUndefined();
        })

        it(('throws an error as friend does not exist'), () => {
            expect(()=> friendsList.removeFriend('Andrew')).toThrow(new Error('Friend not found!'));
        })
    })
})

