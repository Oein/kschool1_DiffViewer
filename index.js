let last = {};
setInterval(() => {
    try {
        let rank = document.querySelector("body > main > div > div.leaderboard-container.svelte-j4f4z6 > div > div > ol");
        let winner = Number(rank.children[0].children[3].innerText.split(" / ")[0].replaceAll(",", ""));
        for (let i = 0; i < rank.childElementCount; i++) {
            let me = rank.children[i]
            let child = Number(rank.children[i].children[3].innerText.split(" / ")[0].replaceAll(",", ""));
            let cx = document.createElement("div")
            cx.innerText = " / -" + (winner - child).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + " ";
            if (me.childElementCount > 4)
                me.children[4].innerText = " / -" + (winner - child).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + " ";
            else
                me.appendChild(cx)
        }

        for (let i = 0; i < rank.childElementCount; i++) {
            let me = rank.children[i]
            let child = Number(rank.children[i].children[3].innerText.split(" / ")[0].replaceAll(",", ""));
            if (!last[me.children[1].innerText]) last[me.children[1].innerText] = child;

            let cx = document.createElement("div")
            if (last[me.children[1].innerText] == child)
                if (me.childElementCount > 5)
                    cx.innerText = me.children[5].innerText.replace("+", "=");
                else
                    cx.innerText = " / =0";
            else
                cx.innerText = " / +" + (child - last[me.children[1].innerText]).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            if (me.childElementCount > 5)
                me.children[5].innerText = cx.innerText;
            else
                me.appendChild(cx)
            last[me.children[1].innerText] = child;
            me.children[5].innerHtml = "&nbsp;" + me.children[5].innerHtml;
            me.children[5].innerText.replace("  ", " ")
        }
    } catch (e) {
        console.error(e)
    }
}, 5000)
