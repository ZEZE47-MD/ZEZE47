const { zokou } = require('../framework/zokou');
const { attribuerUnevaleur } = require('../bdd/welcome');

async function events(nomCom) {
    zokou({
        nomCom: nomCom,
        categorie: 'Group',
        reaction: '⚙️'
    }, async (dest, zk, commandeOptions) => {
        const { ms, arg, repondre, superUser, verifAdmin, nomAuteurMessage } = commandeOptions;

        if (!verifAdmin && !superUser) {
            return repondre(`𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ Yo ${nomAuteurMessage}, you ain’t got the keys to mess with ${nomCom}! 😡 Only admins or 𝘡𝘌𝘡𝘌47 𝘛𝘌𝘊𝘏 can run 𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃 group vibes! 🚫\n◈━━━━━━━━━━━━━━━━◈`);
        }

        if (!arg[0] || arg.join(' ').trim() === '') {
            return repondre(`𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ Yo ${nomAuteurMessage}, don’t be lazy! Use *${nomCom} on* to activate or *${nomCom} off* to shut it down! 😎 𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃 needs clear orders! 🔥\n◈━━━━━━━━━━━━━━━━◈`);
        }

        const setting = arg[0].toLowerCase();
        if (setting === 'on' || setting === 'off') {
            try {
                await attribuerUnevaleur(dest, nomCom, setting);
                await zk.sendMessage(
                    dest,
                    {
                        text: `𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ BOOM, ${nomAuteurMessage}! ${nomCom} is now ${setting} for this group! 🔥\n│❒ ZEZE47 got it locked in! 🚀\n│❒ Powered by 𝘡𝘌𝘡𝘌47 𝘛𝘌𝘊𝘏\n◈━━━━━━━━━━━━━━━━◈`,
                        footer: `Hey ${nomAuteurMessage}! I'm Toxic-MD, created by 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧 😎`
                    },
                    { quoted: ms }
                );
            } catch (error) {
                console.error(`Error updating ${nomCom}:`, error);
                await repondre(`𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ TOTAL BUST, ${nomAuteurMessage}! 𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃  tripped while setting ${nomCom}: ${error.message} 😡 Try again or flop! 😣\n◈━━━━━━━━━━━━━━━━◈`);
            }
        } else {
            repondre(`𝐙𝐄𝐙𝐄𝟒𝟕-𝐌𝐃\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ Yo ${nomAuteurMessage}, what’s this nonsense? 😡 Only *${nomCom} on* or *${nomCom} off* works for ZEZE47 MD Get it right! 🔧\n◈━━━━━━━━━━━━━━━━◈`);
        }
    });
}

// Register the commands
events('welcome');
events('goodbye');
events('antipromote');
events('antidemote');
