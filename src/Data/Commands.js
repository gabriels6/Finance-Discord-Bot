const GuildModel = require('../Models/Guild');

module.exports = {

    async CreateGuild(guildName,Budget){

        const Guild = await GuildModel.create({
            Name:guildName,
            Budget:Budget,
            Expenses:[],
        });

        return Guild;
    },

    async GetGuild(guildName){


        const promise = await GuildModel.findOne({Name:guildName});


        return promise;
    },

    async AddExpense(guildName,expenseValue,expenseName){

        const guild = await GuildModel.findOne({Name:guildName});

        var expenses = guild.Expenses;

        expenses.push(expenseValue+" - "+expenseName);

        const promise = await GuildModel.updateOne({Name:guildName},{Expenses:expenses});

        return promise;
    },

    async RemoveExpense(guildName,expenseName){

        const guild = await GuildModel.findOne({Name:guildName});

        var expenses = guild.Expenses;

        var filteredExpenses = expenses.filter(
            (value) => {
                var dividedValue = value.split(" - ");

                if(dividedValue[1] != expenseName) return value;

            }
        );

        //console.log(filteredExpenses);

        const promise = await GuildModel.updateOne({Name:guildName},{Expenses:filteredExpenses});

        return promise;
    }
}


