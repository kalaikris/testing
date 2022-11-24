// redirect to mail intent service
export function triggerEmail(email) {
  window.location.href = "mailto:" + email;
}

// redirect to phone call intent service
export function triggerPhone(phone) {
  window.open("tel:" + phone);
}
