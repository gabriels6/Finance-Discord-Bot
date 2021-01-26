const Discord = require("discord.js");
const Commands = require("./Data/Commands.js");
const Connection = require("./Data/Connection");
const config = require("./config.json");
require('dotenv').config({path:__dirname + '/../.env'});


//Bot Setup

const Client = new Discord.Client();

Connection.connectDatabase();

const prefix = "!";




Client.on("message", function(message){

    //checks if robot
    if(message.author.bot) return;

    if(!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");

    //shift() - takes first element of array, removes and returns it
    const command = args.shift().toLowerCase();

    const guildName = message.guild.name;

    if(command === "help"){
        var embed = new Discord.MessageEmbed()
            .setTitle("Ec0n0my Bot Helper")
            .setDescription("See commands Here")
            .setColor("#17a2b8");

        embed.addFields({name:"Add guild to finance bot",value:"!add-finance <initial-budget-value>",inline:false});
        embed.addFields({name:"Get the main view of the finances of your guild",value:"!get-finance",inline:false});
        embed.addFields({name:"Add expense for your project",value:"!add-expense <value> <name>",inline:false});
        embed.addFields({name:"Remove expense by name",value:"!remove-expense <expense-name>",inline:false});
        
        message.channel.send(embed);
    }

    if(command === "add-finance"){

        //Structure: !add-finance <budget>
        
        if(args.length === 0) return ;

        const response = Commands.CreateGuild(guildName,args[0]);

        setTimeout(() => {
            message.reply("`"+`Guild added to database!`+"`");
        },2000);
    }

    if(command === "get-finance"){

        (Commands.GetGuild(guildName).then(
            function(obj){

                //var Expenses = "";
                var TotalExpenses = 0.0;

                var embed = new Discord.MessageEmbed()
                .setTitle(obj.Name.toUpperCase())
                .setDescription("Finance Expense sheet")
                .setColor("#1c2fff");

                var Budget = parseFloat(obj.Budget);

                embed.addFields({name:"Expenses",value:"Expenses and Values",inline:false});
                embed.addFields({name:"Budget",value:"$"+Budget,inline:false});

                for(index in obj.Expenses){

                   var Expense = obj.Expenses[index];

                   //Expenses += "\n"+Expense;
                   
                   var SeparateExpense = Expense.split(" - ");

                   embed.addFields({name:SeparateExpense[1],value:"$"+SeparateExpense[0],inline:true});

                   TotalExpenses += parseFloat(SeparateExpense[0]);
                }

                embed.addFields({name:"Expense Total",value:"$"+TotalExpenses,inline:false});
                embed.addFields({name:"Total",value:"$"+ (Budget - TotalExpenses),inline:false});
                
                message.channel.send(embed);

               

                /*message.reply("\n```"+obj.Name.toUpperCase() + "\t \t \t"
                    +"\n____________________________________" + "\t \t \t"
                    +"\nBudget: " + obj.Budget + "\t \t \t"
                    +"\nExpenses:\n"
                    +Expenses
                    +"\n \nTotal Expenses: "+TotalExpenses  
                    +"```");*/
            }
        ));


    }

    if(command === "add-expense"){

        //structure !add-expense <value> <name>

        if(args.length != 2) return;

        (Commands.AddExpense(guildName,args[0],args[1]));

        setTimeout(() => {
            
            var embed = new Discord.MessageEmbed()
            .setTitle("Success!")
            .setDescription("Expense added sucessfully!")
            .setColor("#51f542");

            message.channel.send(embed);

        },2000);
    }

    if(command === "remove-expense"){

        //structure !remove-expense <expense-name>

        if(args.length != 1) return;

        (Commands.RemoveExpense(guildName,args[0]));

        setTimeout(() => {
            var embed = new Discord.MessageEmbed()
            .setTitle("Success!")
            .setDescription("Expense removed sucessfully!")
            .setColor("#51f542");

            message.channel.send(embed);
        },2000);
    }
});


Client.login(process.env.BOT_TOKEN);

