<template>
 <div> </div>
</template>

<script>

export default {
    name: 'AdminSettings',
    layout: 'adminlayout',
    middleware: 'admin',
    data() {
        return {
        }
    },

    created ()
    {
        this.$router.push('/admin/accountsettings');
    }

}
</script>


<style scoped>

.entry
{
    background-color:white;
    border-radius:5px;
    padding:5px;
    margin-bottom:5px;
}

#main_content
{
    min-height: 400px;
    /* background-color: yellow; */
}

</style>
