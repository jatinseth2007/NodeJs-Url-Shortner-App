class CommonSchema {
    createUpdatedColumns() {
        try {
            return {
                createdAt: { type: Date, default: Date.now, required: true, },
                updatedAt: { type: Date, default: Date.now, required: true, },
            };
        } catch (error) {
            throw error;
        }
    }//EOF
}//EOC

module.exports = new CommonSchema();
