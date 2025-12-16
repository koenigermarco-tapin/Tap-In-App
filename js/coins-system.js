/**
* TAP-IN Coins System
* Handles XP to Coins conversion (0.8 exchange rate) and coin management
*/
const CoinsSystem = {
    // Exchange rate: 100 XP = 80 Coins (0.8 rate)
EXCHANGE_RATE: 0.8,
MIN_CONVERSION_XP: 100,
    /**
* Get current coins balance
*/
getCoins: function() {
return parseInt(localStorage.getItem('tapInCoins') || '0');
},
    /**
* Add coins
*/
addCoins: function(amount) {
const current = this.getCoins();
const newAmount = current + amount;
localStorage.setItem('tapInCoins', newAmount.toString());
        // Log transaction
this.logTransaction(amount, 'earned', newAmount);
return newAmount;
},
    /**
* Spend coins
*/
spendCoins: function(amount) {
const current = this.getCoins();
if (current < amount) {
return { success: false, error: 'Insufficient coins' };
}
const newAmount = current - amount;
localStorage.setItem('tapInCoins', newAmount.toString());
        // Log transaction
this.logTransaction(-amount, 'spent', newAmount);
return { success: true, newBalance: newAmount };
},
    /**
* Convert XP to Coins
* @param {number} xpAmount - Amount of XP to convert
*/
convertXPToCoins: function(xpAmount) {
        // Get current XP
const currentXP = parseInt(localStorage.getItem('totalXP') || '0');
        // Validate conversion amount
if (xpAmount < this.MIN_CONVERSION_XP) {
return {
success: false,
error: `Minimum conversion is ${this.MIN_CONVERSION_XP} XP`
};
}
if (xpAmount > currentXP) {
return {
success: false,
error: 'Not enough XP to convert'
};
}
        // Calculate coins (with 0.8 exchange rate)
const coins = Math.floor(xpAmount * this.EXCHANGE_RATE);
        // Deduct XP
const newXP = currentXP - xpAmount;
localStorage.setItem('totalXP', newXP.toString());
        // Add coins
const newCoins = this.addCoins(coins);
        // Log conversion
this.logConversion(xpAmount, coins, newXP, newCoins);
        // Update avatar system if exists
if (window.AVATAR_SYSTEM && typeof window.AVATAR_SYSTEM.update === 'function') {
window.AVATAR_SYSTEM.update();
}
return {
success: true,
coinsEarned: coins,
newXP: newXP,
newCoins: newCoins
};
},
    /**
* Log transaction for analytics
*/
logTransaction: function(amount, type, newBalance) {
const transactions = JSON.parse(localStorage.getItem('coinTransactions') || '[]');
transactions.push({
amount: amount,
type: type,
balance: newBalance,
timestamp: new Date().toISOString()
});
        // Keep last 100 transactions
if (transactions.length > 100) {
transactions.shift();
}
localStorage.setItem('coinTransactions', JSON.stringify(transactions));
},
    /**
* Log conversion for analytics
*/
logConversion: function(xpAmount, coinsEarned, newXP, newCoins) {
const conversions = JSON.parse(localStorage.getItem('xpToCoinsConversions') || '[]');
conversions.push({
xpAmount: xpAmount,
coinsEarned: coinsEarned,
exchangeRate: this.EXCHANGE_RATE,
newXP: newXP,
newCoins: newCoins,
timestamp: new Date().toISOString()
});
        // Keep last 50 conversions
if (conversions.length > 50) {
conversions.shift();
}
localStorage.setItem('xpToCoinsConversions', JSON.stringify(conversions));
},
    /**
* Get conversion preview (how many coins for given XP)
*/
getConversionPreview: function(xpAmount) {
if (xpAmount < this.MIN_CONVERSION_XP) {
return null;
}
return Math.floor(xpAmount * this.EXCHANGE_RATE);
},
    /**
* Format coins for display
*/
formatCoins: function(amount) {
return amount.toLocaleString() + ' 🪙';
},
    /**
* Check if user can afford item
*/
canAfford: function(price) {
return this.getCoins() >= price;
}
};
// Export to global scope
window.CoinsSystem = CoinsSystem;
// Initialize on DOM ready
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', function() {
);
});
} else {
);
}