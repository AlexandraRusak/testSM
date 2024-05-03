<script lang="ts">
    import { afterUpdate } from "svelte";
    import { getConversion } from "./getConversion";

    let amount: number = 0;
    let calcAmount: number;


    $: calcAmount = amount2;


    let calcAmount2: number;
    $: calcAmount2 = amount;

    let amount2: number = 0;

    let selected: string = "USD";
    let selected2: string = "EUR";

    let currency:string
    $: currency = selected
    let currency2:string
    $: currency2 = selected



</script>

<main>
    {#await getConversion(selected, selected2)}
        <p>waiting...</p>
    {:then data}
        <div class="container">
            <h1>Calculate Conversion</h1>
            <div class="flex-container">
                <div class="currency-input">
                    <div class="column">
                        <label for="currency1">Currency:</label>
                        <select bind:value={selected} id="currency1">
                            {#each Object.keys(data.rates) as currency (currency)}
                                <option value={currency}>{currency}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="column">
                        <label for="currency1-amount">Amount:</label>
                        <input
                            on:keyup={() => amount2 = (calcAmount2*data.rates[selected2])}
                            on:click={() => amount2 = (calcAmount2*data.rates[selected2])}
                            id="currency1-amount"
                            type="number"
                            bind:value={amount}
                            min="0"
                        />
                    </div>
                </div>
                <div class="currency-input">
                    <div class="column">
                        <label for="currency2">Currency:</label>
                        <select 
                            bind:value={selected2}
                            id="currency2">
                            {#each Object.keys(data.rates) as currency}
                                <option value={currency}>{currency}</option>
                            {/each}
                        </select>
                    </div>
                    <div class="column">
                        <label for="currency2-amount">Amount:</label>
                        <input
                            on:keyup={() => amount = (calcAmount/data.rates[selected2])}
                            on:click={() => amount = (calcAmount/data.rates[selected2])}
                            id="currency2-amount"
                            type="number"
                            bind:value={amount2}
                            min="0"
                        />
                    </div>
                </div>
            </div>
            <p>1 {selected} = {data.rates[selected2]} {selected2}</p>
        </div>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</main>

<style>
    :root {
        font-family: system-ui;
        font-size: 1rem;
    }

    h1 {
        font-size: 1.5rem;
        font-weight: normal;
        margin-bottom: 40px;
    }

    label {
        font-size: 0.8rem;
    }

    .flex-container {
        display: flex;
        gap: 40px;
    }
    .currency-input {
        display: flex;
    }

    .column {
        display: block;
    }
</style>
