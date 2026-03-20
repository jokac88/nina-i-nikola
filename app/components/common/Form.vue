<script setup>
import RadioButton from "~/components/elements/RadioButton";
import GuestFullName from "~/components/elements/GuestFullName";

const props = defineProps({
    formData: {
        type: Object,
        default: () => {
        }
    },
});

const obj = reactive({
    fullName: '',
    coming: '',
    guestsNumber: 1,
    guestsFullNames: [],
    guestFirstName: '',
    guestLastName: '',
    note: '',
    isSubmitted: false,
    isLoading: false,
    submitError: false,
    isSuccessful: false,
});

const googleFormEndpoint = 'https://docs.google.com/forms/u/0/d/1EkcTtg8crWieGM-WL2qhGzGwe79M-PiwMA6-dJcQXtQ/formResponse';
const guestsObject = {
    1: 'jednog gosta',
    2: 'dva gosta',
    3: 'tri gosta',
    4: 'četiri gosta',
    5: 'pet gostiju',
    6: 'šest gostiju',
    7: 'sedam gostiju',
    8: 'osam gostiju',
    9: 'devet gostiju',
};

const getGuestFullName = computed(() => {
    return `${ obj.guestFirstName } ${ obj.guestLastName }`;
});

const guestFullNameInputDisabled = computed(() => {
    return obj.guestsNumber - 1 === obj.guestsFullNames.length || obj.guestsNumber - 1 < obj.guestsFullNames.length;
});

const guestFullNameButtonDisabled = computed(() => {
    return !obj.guestFirstName || !obj.guestLastName || obj.guestsNumber - 1 === obj.guestsFullNames.length
      || obj.guestsNumber - 1 < obj.guestsFullNames.length;
});

const additionalQuestions = computed(() => {
    return obj.coming === 'DA';
});

const guestsFullNamesReversed = computed(() => {
    return [...obj.guestsFullNames].reverse();
});

function addGuest() {
    if (obj.guestFirstName && obj.guestLastName) {
        obj.guestsFullNames = [...obj.guestsFullNames, getGuestFullName.value];

        obj.guestFirstName = obj.guestLastName = '';

        const inputField = document.querySelector(`.form__guestFirstName input.form__input-field`);

        inputField.focus();
    }
}

function removeGuest(index) {
    obj.guestsFullNames.splice(index - 1, 1);
}

function clearGuestName(props) {
    const inputField = document.querySelector(`.form__${ props } input.form__input-field`);

    inputField.focus();
    obj[props] = '';
}

function scrollToElement(element) {
    element.scrollIntoView({ behavior: 'smooth' });
}

function onSubmit() {
    if (!obj.isSubmitted) {
        obj.isSubmitted = true;
    }

    if (!obj.fullName) {
        const element = document.querySelector('.form__fullName');
        scrollToElement(element);

        return false;
    }

    if (!obj.coming) {
        const element = document.querySelector('.form__coming');
        scrollToElement(element);

        return false;
    }

    if (obj.coming === 'DA' && obj.guestsNumber - 1 !== obj.guestsFullNames.length) {
        const element = document.querySelector('.form__guests-names');
        scrollToElement(element);

        return false;
    }

    document.getElementById('google-form').target = 'google-form-response-iframe';
    const googleIframe = document.getElementById('google-form-response-iframe');

    obj.isLoading = true;

    if (googleIframe) {
        googleIframe.onload = () => {
            obj.isLoading = false;
            obj.isSuccessful = true;
        }
    }
}

function resetForm() {
    obj.fullName = obj.coming = obj.note = '';
    obj.guestsNumber = 1;
    obj.guestsFullNames = [];
    obj.isSubmitted = obj.isLoading = obj.submitError = obj.isSuccessful = false;
}

onMounted(() => {
    const googleForm = document.getElementById('google-form');

    googleForm.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            return false;
        }
    })
});

</script>

<template>
    <section class="form">
        <div class="form__wrapper">
            <p class="form__heading">{{ formData.heading }}</p>
            <form
              id="google-form"
              target="google-form-response-iframe"
              :action="googleFormEndpoint"
              method="POST"
              :onsubmit="onSubmit"
            >
                <div class="form__element form__fullName">
                    <p class="form__text">
                        {{ formData.fullName.question }}
                        <span class="form__required">*</span>
                    </p>
                    <div class="form__input">
                        <input
                          type="text"
                          :name="`entry.${formData.fullName.entry}`"
                          v-model="obj.fullName"
                          :class="{'form__input-field--is-error': obj.isSubmitted && !obj.fullName }"
                          class="form__input-field"
                        />
                        <p v-if="obj.isSubmitted && !obj.fullName" class="form__validation-message">
                            {{ formData.fullName.validationMessage }}</p>
                    </div>
                </div>
                <div class="form__element form__coming">
                    <p class="form__text">
                        {{ formData.coming.question }}
                        <span class="form__required">*</span>
                    </p>
                    <div class="form__input">
                        <RadioButton
                          v-for="value in formData.coming.values"
                          :value="value"
                          :form-entry="`entry.${formData.coming.entry}`"
                          :class="{'radio-button--is-error': obj.isSubmitted && !obj.coming }"
                          :checked="obj.coming === value"
                          @radio-button-clicked="event => obj.coming = event"
                        />
                        <p v-if="obj.isSubmitted && !obj.coming" class="form__validation-message">
                            {{ formData.coming.validationMessage }}
                        </p>
                    </div>
                </div>
                <div v-if="additionalQuestions" class="form__additional-questions">
                    <div class="form__element form__guests-number">
                        <p class="form__text">
                            {{ formData.guestsNumber.question }}
                            <span class="form__description">{{ formData.guestsNumber.description }}</span>
                        </p>
                        <div class="form__select">
                            <select
                              :name="`entry.${formData.guestsNumber.entry}`"
                              v-model="obj.guestsNumber"
                              class="form__input-field"
                            >
                                <option v-for="(option, index) in formData.guestsNumber.options" :value="option + 1">
                                    <template v-if="!index">Samo ja</template>
                                    <template v-else>+{{ option }}</template>
                                </option>
                            </select>
                            <i class="icon-dropdown"/>
                        </div>
                    </div>
                    <div v-if="obj.guestsNumber > 1" class="form__element form__guests-names">
                        <p class="form__text">
                            {{ formData.guestsFullNames.question }}
                            <span class="form__required">*</span>
                            <span v-html="formData.guestsFullNames.description" class="form__description"/>
                        </p>
                        <div class="form__flex-container">
                            <div class="form__guestFirstName">
                                <input
                                  type="text"
                                  v-model="obj.guestFirstName"
                                  @keyup.enter="addGuest"
                                  class="form__input-field"
                                  :class="{'form__guests-names-list--is-error': obj.isSubmitted && !obj.guestFirstName && obj.guestsFullNames.length !== obj.guestsNumber - 1 }"
                                  placeholder="Ime"
                                  :disabled="guestFullNameInputDisabled"
                                />
                                <Transition>
                                    <i
                                      v-if="obj.guestFirstName"
                                      class="icon-close"
                                      @click="clearGuestName('guestFirstName')"/>
                                </Transition>
                            </div>
                            <div class="form__guestLastName">
                                <input
                                  type="text"
                                  v-model="obj.guestLastName"
                                  @keyup.enter="addGuest"
                                  class="form__input-field"
                                  :class="{'form__guests-names-list--is-error': obj.isSubmitted && !obj.guestLastName && obj.guestsFullNames.length !== obj.guestsNumber - 1 }"
                                  placeholder="Prezime"
                                  :disabled="guestFullNameInputDisabled"
                                />
                                <Transition>
                                    <i
                                      v-if="obj.guestLastName"
                                      class="icon-close"
                                      @click="clearGuestName('guestLastName')"/>
                                </Transition>
                            </div>
                            <button
                              type="button"
                              @click="addGuest"
                              @keyup.enter="addGuest"
                              class="form__add-guest-button"
                              :disabled="guestFullNameButtonDisabled"
                            >
                                <i class="icon-user-add"/>
                            </button>
                        </div>
                        <div
                          :class="{'form__guests-names-list--is-error': obj.isSubmitted && obj.guestsFullNames.length !== obj.guestsNumber - 1 }"
                          class="form__guests-names-list"
                        >
                            <p
                              v-if="obj.guestsFullNames.length !== obj.guestsNumber - 1"
                              :class="{'form__guests-number-info--is-error': obj.isSubmitted && obj.guestsFullNames.length !== obj.guestsNumber - 1 }"
                              class="form__guests-number-info"
                            >
                                <span v-if="obj.guestsFullNames.length < obj.guestsNumber - 1">Dodajte
                                    {{ obj.guestsFullNames.length ? 'još' : '' }}
                                    {{ guestsObject[obj.guestsNumber - 1 - obj.guestsFullNames.length] }}
                                </span>
                                <span v-else>
                                    Oduzmite još
                                    {{ guestsObject[obj.guestsFullNames.length + 1 - obj.guestsNumber] }}
                                </span>
                            </p>
                            <GuestFullName
                              v-for="(guestFullName, index) in guestsFullNamesReversed"
                              :guest-fullName="guestFullName"
                              :index="obj.guestsFullNames.length - index"
                              @removeGuest="removeGuest"
                            />
                            <p v-if="obj.isSubmitted && obj.guestsFullNames.length !== obj.guestsNumber - 1"
                               class="form__validation-message">
                                {{ formData.guestsFullNames.validationMessage }}
                            </p>
                        </div>
                        <input
                          type="text"
                          :name="`entry.${formData.guestsFullNames.entry}`"
                          :value="obj.guestsFullNames.join(', ')"
                          class="form__input-field--is-hidden"
                          readonly
                        />
                    </div>
                    <div class="form__element">
                        <p class="form__text">
                            {{ formData.note.question }}
                            <span class="form__description">
                            {{ formData.note.description }}
                        </span>
                        </p>
                        <textarea
                          :name="`entry.${formData.note.entry}`"
                          v-model="obj.note"
                          rows="4"
                          class="form__input-field form__text-area"
                          tabindex="-1"
                        />
                    </div>
                </div>
                <div class="form__submit">
                    <button class="form__submit-button">
                        <span>
                            {{ formData.submitButton }}
                            <img
                              v-if="obj.isLoading"
                              src="@/assets/img/loader.svg"
                              alt="@/assets/img/loader.svg"
                            />
                        </span>
                    </button>
                </div>
                <iframe id="google-form-response-iframe" name="google-form-response-iframe"/>
                <Transition>
                    <div v-if="obj.isLoading" class="form__overlay"/>
                </Transition>
            </form>
            <Transition>
                <div v-if="obj.isSuccessful" class="form__successful-message">
                    <div class="form__successful-message-wrapper">
                        <p v-html="formData.successfulMessage"></p>
                        <button
                          type="button"
                          @click="resetForm"
                          class="form__close-form-button"
                        >
                            <i class="icon-close"/>
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
        <p class="form__info">{{ formData.info }}</p>
    </section>
</template>
