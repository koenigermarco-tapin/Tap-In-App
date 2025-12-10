// Validation - Stub
const Validation = {
    isEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    isRequired: (value) => value && value.trim().length > 0
};
